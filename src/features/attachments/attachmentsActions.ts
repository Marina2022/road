'use server'


import {Entity} from "@prisma/client";
import {prisma} from "@/lib/prismaClient";
import {ActionState, fromErrorToState} from "@/utils/formUtils";
import {getAuthOrRedirect, isOwner} from "@/utils/authUtils";
import {z} from "zod";
import {sizeInMb} from "@/utils/sizeInMb";
import {ACCEPTED, MAX_SIZE} from "@/features/ticket/constants";
import {s3} from "@/lib/aws";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {generateS3Key} from "@/utils/generateS3Key";
import {setCookie} from "@/actions/cookies";
import {redirect} from "next/navigation";
import {getTicket} from "@/features/ticket/ticketActions";
import {isComment, isTicket} from "@/features/attachments/types";

export const getAttachments = async (entityId: number | string, entity: Entity) => {

  switch (entity) {
    case 'TICKET':
      return prisma.attachment.findMany({where: {ticketId: entityId as number}})
    case "COMMENT":
      return prisma.attachment.findMany({where: {commentId: entityId as string}})
    default: return []
  }
}

type Args = {
  entityId: number | string,
  entity: Entity
}


export const createAttachment = async ({entityId, entity}: Args , state: ActionState, formData: FormData): Promise<ActionState> => {

  const {user} = await getAuthOrRedirect()

  let subject

  switch (entity) {
    case 'TICKET':
      subject = await getTicket(entityId as number)
      break
    case 'COMMENT':
      subject =
        await prisma.comment.findUnique(
          {
            where: {id: entityId as string},
            include: {ticket: true}
          })
      break
    default: throw new Error('Unknown entity')
  }

  if (!subject) return fromErrorToState(new Error('No comment'), formData)
  if (!isOwner(user, subject)) return fromErrorToState(new Error('It is not your comment'), formData)

  const createAttachmentSchema = z.object({
      files: z.custom<FileList>()
        .transform((files) => Array.from(files))
        .transform((files) => files.filter(file => file.size > 0))
        .refine(
          (files) => files.every((file) => sizeInMb(file.size) <= MAX_SIZE),
          `The maximum file size is ${MAX_SIZE}`
        )
        .refine((files) => files.every((file) => ACCEPTED.includes(file.type)),
          "File type is not supported")
        .refine(
          (files) => files.length !== 0, "File is required")
    }
  )


  try {

    const {files} = createAttachmentSchema.parse({files: formData.getAll('files')})

    for (const file of files) {
      const buffer = await Buffer.from(await file.arrayBuffer())

      const attachment = await prisma.attachment.create({
        data: {
          name: file.name,

          ...(entity==='TICKET' ? {ticketId: entityId as number} : {}),
          ...(entity==='COMMENT' ? {commentId: entityId as string} : {}),

          entity: entity
        }
      })

      let organizationId = ''

      switch (entity) {
        case 'TICKET':
          if (isTicket(subject))
          organizationId = subject.organizationId as string
          break
        case 'COMMENT':
          if (isComment(subject))
          organizationId = subject.ticket.organizationId as string
          break
        default: throw new Error('Unknown entity')
      }

      await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: generateS3Key({
          organizationId,
          entityId,
          entity,
          fileName: file.name,
          attachmentId: attachment.id
        }),
        Body: buffer,
        ContentType: file.type
      }))
    }


    // revalidatePath('/tickets')

  } catch (err) {
    console.log(err)
    return fromErrorToState(err, formData)
  }
  await setCookie({key: 'toast', value: 'Attachments uploaded'})

  let ticketId

  switch (entity) {
    case 'TICKET':
      ticketId = subject.id
      break
    case 'COMMENT':
      if (!isTicket(subject))
      ticketId = subject.ticket.id 
      break
    default: throw new Error('Unknown entity')
  }

  redirect(`/tickets/${ticketId}`)
}