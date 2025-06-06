'use client'

import React, {useActionState} from 'react';
import Form from "@/components/form/form";
import {EMPTY_STATE} from "@/utils/formUtils";
import { switchOrganization } from '../organizationActions';

type OrganizationSwitchProps = {
  organizationId: string;
  trigger: React.ReactNode;
} 

const OrganizationSwitch = ({organizationId, trigger}:OrganizationSwitchProps, ) => {

  const [actionState, action] = useActionState(switchOrganization.bind(null, organizationId), EMPTY_STATE)  
  return (
    <Form actionState={actionState} action={action} >
      <div className="w-[92px]">
      {trigger}
      </div>  
    </Form>
  );
};

export default OrganizationSwitch;