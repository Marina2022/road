import React, {Suspense} from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Heading from "@/components/shared/Heading";
import Loader from "@/components/shared/Loader";
import MembersList from "@/features/organization/components/MembersList";

type PageProps = {
  params: Promise<{
    organizationId: string;
  }>
}

const Page = async({params}: PageProps) => {
    
  const {organizationId} = await params;
  
  return (

    <div className='flex-1 flex flex-col gap-8'>

      <Heading
        title={`Organization`} 
        text="All members of organization"
        actions={
          <Button className="max-w-[260px]" asChild>
            <Link href='/organizations/create'>Create organization</Link>
          </Button>
        }
      />

      <Suspense fallback={<Loader/>}>
        <MembersList organizationId={organizationId}  />
      </Suspense>
      
    </div>
  );
};

export default Page;