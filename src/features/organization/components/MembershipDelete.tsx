'use client'

import React, {useActionState} from 'react';
import useConfirmDialog from "@/hooks/useConfirmDialog";
import {EMPTY_STATE} from "@/utils/formUtils";
import {deleteMembership} from '../organizationActions';
import {useRouter} from "next/navigation";

type MembershipDeleteProps = {
  trigger: React.ReactElement<{ onClick: ()=>void }>;
  organizationId: string;
  userId: string;
}

const MembershipDelete = ({trigger, userId, organizationId}: MembershipDeleteProps) => {
  
  const router = useRouter();

  const [actionState, action, isPending] = useActionState(deleteMembership.bind(null, {userId, organizationId}), EMPTY_STATE)

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

export default MembershipDelete;