import React from 'react';
import CardCompact from "@/components/shared/Card-compact";
import Link from "next/link";
import SignUpForm from "@/features/auth/components/SignUpForm";

const Page = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <CardCompact className="max-w-[520px] flex-1 mx-auto mb-10 animate-fade-in"
                   title="Sign Up"
                   description="Create an Account"
                   content={<SignUpForm />}
                   footer={<Link className="text-sm text-muted-foreground" href="/sign-in">Have an account? Sign in now</Link>}
      />
    </div>
  );
};

export default Page;