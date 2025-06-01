'use client'
import React, {useActionState} from 'react';
import {CommentWithMetadata} from "@/features/comment/commetTypes";
import {EMPTY_STATE} from "@/utils/formUtils";
import {LucideTrash} from "lucide-react";
import {deleteComment} from "@/features/comment/commentActions";
import {User} from "lucia";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import {Button} from "@/components/ui/button";

type DeleteCommentProps = {
  comment: CommentWithMetadata;
  setComments: React.Dispatch<React.SetStateAction<CommentWithMetadata[]>>;
}

const DeleteComment = ({comment, setComments}: DeleteCommentProps) => {

  const [actionState, action] = useActionState(deleteComment.bind(null, comment), EMPTY_STATE)

  const onSuccess = () => {
    setComments((prev: CommentWithMetadata[]) => prev.filter(prevComment => prevComment.id !== comment.id))
  }


  const {dialogTrigger, dialog} = useConfirmDialog({
    onSuccess,
    action,
    actionState,
    trigger: <Button className="cursor-pointer"><LucideTrash/></Button>
  })

  return (
    <>
      {dialogTrigger}
      {dialog}
    </>
  )
}

export default DeleteComment;