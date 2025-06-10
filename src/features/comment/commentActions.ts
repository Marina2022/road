'use server'

import {prisma} from "@/lib/prismaClient";
import {getAuth} from "@/features/auth/authActions";
import {redirect} from "next/navigation";
import {ActionState, fromErrorToState, toActionState} from "@/utils/formUtils";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {CommentWithMetadata} from "@/features/comment/commetTypes";
import {getAuthOrRedirect, isOwner} from "@/utils/authUtils";


export const getComments = async (ticketId: number, cursor?: number | string) => {

  const where = {
    ticketId,
    createdAt: {
      lt: cursor ? new Date(cursor) : undefined,
    },
  }

  // const skip = offset ?? 0
  const take = 2

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany(
      {
        where,
        take: take + 1,
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
      }),

    prisma.comment.count({where})

  ])

  const hasNext =  comments.length > take
    
  let cursorToReturn
  let commentsToReturn
  
  if (hasNext) {
    cursorToReturn = comments.at(-2)?.createdAt.valueOf()
    commentsToReturn =  comments.slice(0, -1)
  } else {
    cursorToReturn = comments.at(-1)?.createdAt.valueOf()
    commentsToReturn = comments
  }


  return {
    list: commentsToReturn,
    metadata: {
      count,
      hasNext,
      cursor: cursorToReturn,
    }
  }
}


export const createComment = async (ticketId: number, actionState: ActionState, formData: FormData): Promise<ActionState> => {

  const auth = await getAuth()
  if (!auth.user) redirect('/sign-in')
  const content = formData.get('content')?.toString()
  const commentSchema = z.object({
    content: z.string().min(1).max(1024),
  })

  let comment

  try {
    const contentData = commentSchema.parse({content})

    comment = await prisma.comment.create({
      data: {
        ...contentData,
        userId: auth.user.id,
        ticketId,
      },
      include: {
        user: true
      }
    })

    revalidatePath(`/tickets/${ticketId}`)
    return toActionState('SUCCESS', 'Created comment', comment)

  } catch (err) {
    return fromErrorToState(err, formData)
  }
}


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