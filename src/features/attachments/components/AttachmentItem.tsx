import React from 'react';
import {Attachment} from "@prisma/client";
import Link from 'next/link';

const AttachmentItem = ({attachment}: {attachment: Attachment}) => {
  
  const link = '/api/aws/s3/attachments/' + attachment.id;
  
  return (
    // <Link href={link}>
    //   {attachment.name}
    // </Link>
    <div>

      <img className="max-w-[100px] " src={link} alt=""/>
    </div>
  );
};

export default AttachmentItem;