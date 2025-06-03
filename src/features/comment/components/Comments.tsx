'use client'

import React, {useEffect} from 'react';
import OneComment from "@/features/comment/components/OneComment";
import CommentCreateForm from "@/features/comment/components/CommentCreateForm";
import CardCompact from "@/components/shared/Card-compact";
import DeleteComment from "@/features/comment/components/DeleteComment";
import {isOwner} from "@/utils/authUtils";
import {CommentWithMetadata} from "@/features/comment/commetTypes";
import {User} from "lucia";
import {Button} from "@/components/ui/button";
import {getComments} from '../commentActions';
import {PaginatedData} from "@/types/pagination";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";
import {getBaseUrl} from "@/utils/testEnv";

type CommentsProps = {
  ticketId: number;
  commentsData: PaginatedData<CommentWithMetadata>;
  user: User;
}

const Comments = ({ticketId, commentsData, user}: CommentsProps) => {
  
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['comments', ticketId],
    queryFn: ({pageParam}) => getComments(ticketId, pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.metadata.hasNext ? lastPage.metadata.cursor : undefined
    },
    initialData: {
      pages: [{
        list: commentsData.list,
        metadata: commentsData.metadata
      }],
      pageParams: [undefined]
    }
  })


  console.log("getBaseUrl = ", getBaseUrl())
  
   
  const queryClient = useQueryClient();

  const handleMore = async () => {
    await fetchNextPage();
  }

  const handleAddComment = () => {
    queryClient.invalidateQueries({queryKey: ['comments', ticketId]})
  }

  const handleDelete = () => {
    queryClient.invalidateQueries({queryKey: ['comments', ticketId]})
  }

  const comments = data.pages.map(page => page.list).flat()  
  
  const {ref, inView} = useInView()
    
  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      handleMore()
    }
  }, [inView])

  return (
    <div>
      <CardCompact
        title="Create a new comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} handleAddComment={handleAddComment}/>}
      />

      <div className="flex flex-col gap-4 mt-10 ml-10 mb-10">
        {
          comments.map(comment => <OneComment
            key={comment.id}
            comment={comment}
            buttons={[
              ...(isOwner(user, comment)
                ? [<DeleteComment comment={comment} key={0} handleDelete={handleDelete}/>]
                : [<div key={0} className="w-10"></div>])
            ]}
          />)
        }
      </div>

      {
        // metadata.hasNext && <div className="w-full flex justify-center mb-10">
        hasNextPage && <div className="w-full flex justify-center mb-10">
          <Button className="flex-1 ml-10" onClick={handleMore} variant="ghost"
                  disabled={isFetchingNextPage}>More</Button>
        </div>
      }
      
      <div ref={ref}></div>
    </div>
  );
};

export default Comments;