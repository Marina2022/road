import React from 'react';
import CardCompact from "@/components/shared/Card-compact";
import EmailVerificationForm from "@/features/auth/components/EmailVerificationForm";
import EmailVerificationResendForm from "@/features/auth/components/EmailVerificationResendForm";

const Page = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <CardCompact className="max-w-[520px] flex-1 mx-auto mb-10 animate-fade-in"
                   title="Verify Email"
                   description="Please verify your email to continue"
                   content={
                     <div className="flex flex-col gap-4">
                       <EmailVerificationForm/>
                       <EmailVerificationResendForm/>
                     </div>
                   }
      />
    </div>
  );
};

export default Page;