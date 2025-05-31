import React from 'react';
import OneComment from "@/features/comment/components/OneComment";
import {getComments} from "@/features/comment/commentActions";
import CommentCreateForm from "@/features/comment/components/CommentCreateForm";
import CardCompact from "@/components/shared/Card-compact";
import DeleteComment from "@/features/comment/components/DeleteComment";
import {getAuthOrRedirect} from "@/utils/authUtils";
import {isOwner} from "@/utils/authUtils";

type CommentsProps = {
  ticketId: number;
}

const Comments = async ({ticketId}: CommentsProps) => {

  const comments = await getComments(ticketId);
  const {user} = await getAuthOrRedirect()

  return (
    <div>
      <CardCompact
        title="Create a new comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId}/>}
      />

      <div className="flex flex-col gap-4 mt-10 ml-10 mb-10">
        {
          comments.map(comment => <OneComment
            key={comment.id}
            comment={comment}
            buttons={[
              ...(isOwner(user, comment)
                ? [<DeleteComment comment={comment} user={user} key={0}/>]
                : [<div key={0} className="w-10"></div>])
            ]}
          />)
        }
      </div>
    </div>
  );
};

export default Comments;