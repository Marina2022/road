import React, {Suspense} from 'react';
import Heading from "@/components/shared/Heading";
import Loader from '@/components/shared/Loader';
import OrganizationList from "@/features/organization/components/OrganizationList";
import RedirectToaster from "@/components/shared/RedirectToaster";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const Page = () => {
  return (
    <div className='flex-1 flex flex-col gap-8'>
      <Heading 
        title="Organizations" 
        text="All your organizations in one place"
        actions={  
        <Button className="max-w-[260px]" asChild>
          <Link href='/organization/create'>Create organization</Link>
        </Button>
        }
      />
      <Suspense fallback={<Loader/>}>
        <OrganizationList/>
      </Suspense>
      <RedirectToaster/>
    </div>
  );
};

export default Page;