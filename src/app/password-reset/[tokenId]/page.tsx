import React from 'react';
import {prisma} from "@/lib/prismaClient";
import {hashToken} from "@/utils/crypto";
import CardCompact from "@/components/shared/Card-compact";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

type PageProps = {
  params: Promise<{
    tokenId: string;
  }>
}

const Page = async ({params}: PageProps) => {
  
  const {tokenId}  = await params

  console.log('tokenId = ', tokenId)
  console.log('hashToken(tokenId) = ', hashToken(tokenId))
  
  const resetTokenHashRecord = await prisma.passwordResetToken.findUnique({where: {
      tokenHash: hashToken(tokenId)}
  })
  
  if (!resetTokenHashRecord) return <div>С ума посходили? нет такого хэша!!!</div>
  
  return (    
  <div className="h-full w-full flex items-center justify-center">
    <CardCompact className="max-w-[520px] flex-1 mx-auto mb-10 animate-fade-in"
                 title="New Password"
                 description="Enter a new password for your account"
                 content={<ResetPasswordForm tokenId={tokenId} />}
    />
  </div>
  );
};

export default Page;