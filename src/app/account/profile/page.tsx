import React from 'react';
import Heading from "@/components/shared/Heading";
import AccountTabs from "@/features/account/account-tabs";


const Page = () => {
  
  return (
    <Heading title="Profile" text="Profile info" tabs={

      <AccountTabs defaultValue="profile" />
    } />
  );
};

export default Page;