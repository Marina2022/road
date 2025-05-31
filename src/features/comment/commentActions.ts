'use server'

import {prisma} from "@/lib/prismaClient";
import {getAuth} from "@/features/auth/authActions";
import {redirect} from "next/navigation";
import {ActionState, fromErrorToState, toActionState} from "@/utils/formUtils";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {CommentWithMetadata} from "@/features/comment/commetTypes";
import {getAuthOrRedirect, isOwner} from "@/utils/authUtils";

export const getComments = async (ticketId: number) => {
  return prisma.comment.findMany(
    {
      where: {ticketId},
      include: {
        user: {
          select: {
            username: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
}

export const createComment = async (ticketId: number, actionState: ActionState, formData: FormData): Promise<ActionState> => {

  const auth = await getAuth()
  if (!auth.user) redirect('/sign-in')

  const content = formData.get('content')?.toString()

  const commentSchema = z.object({
    content: z.string().min(1).max(1024),
  })

  try {
    const contentData = commentSchema.parse({content})

    await prisma.comment.create({
      data: {
        ...contentData,
        userId: auth.user.id,
        ticketId,
      }
    })

    revalidatePath(`/tickets/${ticketId}`)
    return toActionState('SUCCESS', 'Created comment')
    
  } catch (err) {
    return fromErrorToState(err, formData)
  }
}

// export const deleteComment = async (comment: CommentWithMetadata, actionState: ActionState, formData: FormData): Promise<ActionState> => {
export const deleteComment = async (comment: CommentWithMetadata): Promise<ActionState> => {
  console.log('пришел')
  const auth = await getAuthOrRedirect()
  
  if (!isOwner(auth.user, comment)) {
    console.log('сюда')
    return toActionState('ERROR', "It's not your comment!")
  } 
  
  try {
    await prisma.comment.delete({
      where: {
        id: comment.id,
        userId: auth.user.id,
      }
    })

    revalidatePath(`/tickets/${comment.ticketId}`)
    return toActionState('SUCCESS', 'Comment deleted')

  } catch (err) {
    console.log(err)
    return toActionState('ERROR', 'Comment NOT deleted')
  }
} 