'use client'

import React, {useActionState} from 'react';
import useConfirmDialog from "@/hooks/useConfirmDialog";
import {EMPTY_STATE} from "@/utils/formUtils";
import { deleteOrganization } from '../organizationActions';
import {useRouter} from "next/navigation";

type OrganizationDeleteProps = {
  trigger: React.ReactElement<{ onClick: ()=>void }>;
  organizationId: string;
}

const OrganizationDelete = ({trigger, organizationId}: OrganizationDeleteProps) => {

  const router = useRouter();
  const [actionState, action, isPending] = useActionState(deleteOrganization.bind(null, organizationId), EMPTY_STATE)

  const {dialogTrigger, dialog} = useConfirmDialog({
      isPending,
      trigger,
      action,
      actionState,
    onSuccess: ()=>router.refresh()
    }
  )

  return (
    <div>
      {dialogTrigger}
      {dialog}
    </div>
  );
};

export default OrganizationDelete;