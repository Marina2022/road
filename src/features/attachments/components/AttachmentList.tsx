import React from 'react';
import AttachmentItem from "@/features/attachments/components/AttachmentItem";
import {Entity} from "@prisma/client";
import {getAttachments} from "@/features/attachments/attachmentsActions";

const AttachmentList = async ({entityId, entity}:{entityId: number, entity: Entity}) => {

  const attachments = await getAttachments(entityId, entity)

  return (
    <ul className="mb-6 text-sm cursor-pointer flex flex-col gap-3">

      {
        attachments.map((attachment) => <AttachmentItem attachment={attachment} key={attachment.name}  />)
      }
      
    </ul>
  );
};

export default AttachmentList;