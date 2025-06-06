import React, {Suspense} from 'react';
import OrganizationList from "@/features/organization/components/OrganizationList";
import Heading from "@/components/shared/Heading";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/shared/Loader";
import RedirectToaster from "@/components/shared/RedirectToaster";
import {getOrganizationsByUser} from "@/features/organization/organizationActions";
import {redirect} from "next/navigation";

const Page = async () => {

  const organizations = await getOrganizationsByUser()

  const hasActive = organizations.some((organizations) => organizations.membershipByUser.isActive)

  if (hasActive) {
    redirect('/organizations')
  }
  
  return (

    <div className='flex-1 flex flex-col gap-8'>
      <Heading
        title="Select Organization"
        text="Pick one organization to work with"
        actions={
          <Button className="max-w-[260px]" asChild>
            <Link href='/onboarding'>Create organization</Link>
          </Button>
        }
      />
      <Suspense fallback={<Loader/>}>
        <OrganizationList limitedAccess />
      </Suspense>
      <RedirectToaster/>
    </div>
  )
}

export default Page;