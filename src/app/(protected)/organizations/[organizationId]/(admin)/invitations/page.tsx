import React, {Suspense} from 'react';
import Heading from "@/components/shared/Heading";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/shared/Loader";
import InvitationList from "@/features/organization/components/InvitationList";
import InvitationCreateButton from "@/features/organization/components/InvitationCreateButton";

type PageProps = {
  params: Promise<{
    organizationId: string;
  }>
}

const Page = async ({params}: PageProps) => {
  const {organizationId} = await params;

  return (
    <div className='flex-1 flex flex-col gap-8'>
      <Heading
        title="Invitations"
        text="Invitations to Organization"
        actions={

          <>
            <Button className="max-w-[260px]" asChild>
              <Link href={`/organizations/${organizationId}/membership`}>Members</Link>
            </Button>

            <InvitationCreateButton organizationId={organizationId}/>
          </>
        }
      />

      <Suspense fallback={<Loader/>}>
        <InvitationList organizationId={organizationId}/>

      </Suspense>
    </div>
  );
};

export default Page;