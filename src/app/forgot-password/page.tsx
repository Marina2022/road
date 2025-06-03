import React from 'react';

import CardCompact from "@/components/shared/Card-compact";
import ForgotPasswordForm from "@/features/auth/components/ForgotPaswordForm";

const Page = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <CardCompact className="max-w-[520px] flex-1 mx-auto mb-10 animate-fade-in"
                   title="Forgot Password"
                   description="Enter your email address to reset your password"
                   content={<ForgotPasswordForm />}                   
      />
    </div>
  );
};

export default Page;