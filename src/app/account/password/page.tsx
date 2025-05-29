import React from 'react';
import Heading from "@/components/shared/Heading";
import AccountTabs from "@/features/account/account-tabs";

const Page = () => {

  return (
    <div>      
              
      <Heading title="Password" text="Keep your passord secure" tabs={<AccountTabs defaultValue="password" />} />
    </div>    
  );
};

export default Page;