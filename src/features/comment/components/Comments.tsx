'use client'

import React, {useState} from 'react';
import OneComment from "@/features/comment/components/OneComment";
import CommentCreateForm from "@/features/comment/components/CommentCreateForm";
import CardCompact from "@/components/shared/Card-compact";
import DeleteComment from "@/features/comment/components/DeleteComment";
import {isOwner} from "@/utils/authUtils";
import {CommentWithMetadata} from "@/features/comment/commetTypes";
import {User} from "lucia";
import {Button} from "@/components/ui/button";
import {getComments} from '../commentActions';

type CommentsProps = {
  ticketId: number;
  commentsData: { list: CommentWithMetadata[], metadata: { count: number, hasNext: boolean } };
  user: User;
}

const Comments = ({ticketId, commentsData, user}: CommentsProps) => {
  const [comments, setComments] = useState(commentsData.list);
  const [hasMore, setHasMore] = useState(commentsData.metadata.hasNext);

  const handleMore = async () => {
    const newComments = await getComments(ticketId, comments.length);
    setComments((prevComments) => [...prevComments, ...newComments.list])
    setHasMore(newComments.metadata.hasNext)
  }

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

      {
        hasMore && <div className="w-full flex justify-center mb-10">
          <Button className="flex-1 ml-10" onClick={handleMore} variant="ghost">More</Button>
        </div>
      }

    </div>
  );
};

export default Comments;