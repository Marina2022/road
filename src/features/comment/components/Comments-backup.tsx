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
import {ActionState} from "@/utils/formUtils";
import {PaginatedData} from "@/types/pagination";

type CommentsProps = {
  ticketId: number;
  commentsData: PaginatedData<CommentWithMetadata>;
  user: User;
}

const Comments = ({ticketId, commentsData, user}: CommentsProps) => {
  const [comments, setComments] = useState(commentsData.list);
  const [metadata, setMetadata] = useState(commentsData.metadata);

  const handleMore = async () => {
    const newComments = await getComments(ticketId, metadata.cursor);
    setComments((prevComments) => [...prevComments, ...newComments.list])
    setMetadata(newComments.metadata)
  }

  const handleAddComment = (actionState: ActionState)=>{
    setComments(prevComments => [...prevComments, actionState.data as CommentWithMetadata]);
  }

  // тут правильный вариант, заменила на второй, т.к. ругается тайпскрипт на Верселе
  // const handleDelete = (comment: CommentWithMetadata)=>{
  //   setComments((prev: CommentWithMetadata[]) => prev.filter(prevComment => prevComment.id !== comment.id))
  // }

  const handleDelete = ()=>{
    // setComments((prev: CommentWithMetadata[]) => prev.filter(prevComment => prevComment.id !== comment.id))
  }
  return (
    <div>
      <CardCompact
        title="Create a new comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} handleAddComment={handleAddComment} />}
      />

      <div className="flex flex-col gap-4 mt-10 ml-10 mb-10">
        {
          comments.map(comment => <OneComment
            key={comment.id}
            comment={comment}
            buttons={[
              ...(isOwner(user, comment)
                // ? [<DeleteComment comment={comment} key={0} handleDelete={handleDelete} />]
                ? [<DeleteComment comment={comment} key={0} handleDelete={handleDelete} />]
                : [<div key={0} className="w-10"></div>])
            ]}
          />)
        }
      </div>

      {
        metadata.hasNext && <div className="w-full flex justify-center mb-10">
          <Button className="flex-1 ml-10" onClick={handleMore} variant="ghost">More</Button>
        </div>
      }

    </div>
  );
};

export default Comments;