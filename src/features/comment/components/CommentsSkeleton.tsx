import {Skeleton} from "@/components/ui/skeleton";

const CommentsSkeleton = () => {
  return (
    <div className="space-y-4 w-[620px]">
      <Skeleton className="h-[230px] w-full mb-10 rounded-2xl"  />
      <Skeleton className="h-[80px] ml-10 rounded-2xl"/>
      <Skeleton className="h-[80px] ml-10 rounded-2xl"/>
    </div>
  )
}


export default CommentsSkeleton;