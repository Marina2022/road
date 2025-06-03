import React from 'react';
import SignInForm from "@/features/auth/components/SignInForm";

import CardCompact from "@/components/shared/Card-compact";
import Link from "next/link";
import RedirectToaster from "@/components/shared/RedirectToaster";

const Page = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <CardCompact className="max-w-[520px] flex-1 mx-auto mb-10 animate-fade-in"
                   title="Sign In"
                   description="Sign in your account"
                   content={<SignInForm />}
                   footer={<div className="flex justify-between text-sm w-full">
                     <Link href="/sign-up">No account yet?</Link>
                     <Link href="/forgot-password">Forgot Password?</Link>                     
                   </div>}
      />
      <RedirectToaster/>
    </div>
  );
};

export default Page;