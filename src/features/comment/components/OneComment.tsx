import {format} from "date-fns";
import {CommentWithMetadata} from "@/features/comment/commetTypes";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {ReactNode} from "react";

type CommentProps = {
  comment: CommentWithMetadata;
  buttons: ReactNode[]
}

const OneComment = async({comment, buttons}: CommentProps) => {
    
  return (
    <div className="flex gap-4 w-full">
      <Card className="flex-1">
        <CardContent className="whitespace-pre-line">
          {comment.content}
        </CardContent>
        <div className="flex gap-4">
          <CardFooter className="flex justify-between text-sm text-muted-foreground w-full">
            <div>{format(comment.createdAt.toString(), "yyyy-MM-dd")}</div>
            <div>{comment.user?.username ?? "Deleted User"}</div>
          </CardFooter>
        </div>
      </Card>
      {buttons}      
    </div>
  );
};

export default OneComment;