import CardCompact from '@/components/shared/Card-compact';
import React from 'react';
import InvintationAcceptForm from "@/features/auth/components/InvintationAcceptForm";

type PageProps = {
  params: Promise<{
    tokenId: string
  }>
}

const Page = async ({params}: PageProps) => {

  const {tokenId} = await params

  return (
    <div className="flex-1 flex flex-col justify-center items-center mt-40">
      <CardCompact
        title={"Invitation to Organization"}
        description="Accept the invitation to join the organization"
        className="w-full max-w-[420px] animate-fade-in"
        content={<InvintationAcceptForm tokenId={tokenId}/>}
      />
    </div>
  );
};

export default Page;