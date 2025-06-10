'use client'

import React, {useActionState} from 'react';
import {Ban, Check} from "lucide-react";
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from '@/components/form/form';
import SubmitButton from "@/components/form/SubmitButton";
import {togglePermission} from "@/features/organization/organizationActions";


type PermissionToggleProps = {
  userId: string;
  organizationId: string;
  permissionKey: "canDeleteTicket";
  permissionValue: boolean;
}

const PermissionToggle = ({userId, organizationId, permissionKey, permissionValue}: PermissionToggleProps) => {

  const [actionState, action] = useActionState(togglePermission.bind(null, {
    userId,
    organizationId,
    permissionKey
  }), EMPTY_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton  
      className="w-[36px]"  
        label={permissionValue ? <Check/> : <Ban/>}
      />
    </Form>
  );
};

export default PermissionToggle;

