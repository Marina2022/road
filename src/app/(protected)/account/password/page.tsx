import React from 'react';
import Heading from "@/components/shared/Heading";
import AccountTabs from "@/features/account/account-tabs";
import CardCompact from "@/components/shared/Card-compact";
import PasswordChangeForm from "@/features/auth/components/PasswordChangeForm";

const Page = () => {

  return (
    <div>     
      <Heading title="Password" text="Keep your passord secure" tabs={<AccountTabs defaultValue="password" />} />

      <div className="h-full w-full flex items-center">
        <CardCompact className="max-w-[520px] flex-1 mx-auto mb-10 animate-fade-in"
                     title="Change Password"
                     description="Enter your current password"
                     content={<PasswordChangeForm />}
        />
      </div>
      
    </div>    
  );
};

export default Page;