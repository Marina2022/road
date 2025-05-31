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
  user: User;
}

const DeleteComment = ({comment, user}: DeleteCommentProps) => {

  const [actionState, action] = useActionState(deleteComment.bind(null, comment), EMPTY_STATE)

  const {dialogTrigger, dialog} = useConfirmDialog({
    action,
    actionState,
    trigger: <Button className="cursor-pointer"><LucideTrash/></Button>
  })
  
  return (
    <>
      {/*<Form action={action} actionState={actionState}>*/}
      {/*<SubmitButton icon={<LucideTrash/>}/>*/}
      {/*</Form>*/}

      {dialogTrigger}
      {dialog}
    </>
  )
};

export default DeleteComment;