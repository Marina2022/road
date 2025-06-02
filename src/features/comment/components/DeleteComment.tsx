'use client'
import React, {useActionState} from 'react';
import {CommentWithMetadata} from "@/features/comment/commetTypes";
import {EMPTY_STATE} from "@/utils/formUtils";
import {LucideTrash} from "lucide-react";
import {deleteComment} from "@/features/comment/commentActions";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import {Button} from "@/components/ui/button";

type DeleteCommentProps = {
  comment: CommentWithMetadata;
  handleDelete: () => void;
}

const DeleteComment = ({comment, handleDelete}: DeleteCommentProps) => {

  const [actionState, action, isPending] = useActionState(deleteComment.bind(null, comment), EMPTY_STATE)

  const onSuccess = () => {
    // handleDelete(comment)
    handleDelete()
  }

  const {dialogTrigger, dialog} = useConfirmDialog({
    onSuccess,
    isPending,
    action,
    actionState,
    trigger: <Button className="cursor-pointer">
      {
        <LucideTrash/>
      }
    </Button>
  })

  return (
    <>
      {dialogTrigger}
      {dialog}
    </>
  )
}

export default DeleteComment;