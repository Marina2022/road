import {Suspense} from 'react';

import CardCompact from "@/components/shared/Card-compact";
import AttachmentCreateForm from "@/features/attachments/components/AttachmentCreateForm";
import AttachmentList from "@/features/attachments/components/AttachmentList";
import Loader from "@/components/shared/Loader";
import { Entity } from '@prisma/client';

type AttachmentProps = {
  entityId: number;
  isOwner: boolean;
  entity: Entity;
}

const Attachments = ({entityId, isOwner, entity}: AttachmentProps) => {
  return (
    <CardCompact
      className="max-w-[620px] mx-auto"
      title="Attachments"
      description="Attached images or PDF"
      content={
        <>

          <Suspense fallback={<Loader />}>
            <AttachmentList entityId={entityId} entity={entity}  />
          </Suspense>

          {isOwner && < AttachmentCreateForm entityId={entityId} entity={'TICKET'} />}
        </>

      }

    >

    </CardCompact>
  );
};

export default Attachments;