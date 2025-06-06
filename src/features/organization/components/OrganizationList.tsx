import React from 'react';
import {getOrganizationsByUser} from "@/features/organization/organizationActions";
import {format} from 'date-fns';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {LucideArrowLeftRight, LucideArrowUpRight, LucideLogOut, LucidePencil, LucideTrash} from "lucide-react";
import OrganizationSwitch from "@/features/organization/components/OrganizationSwitch";
import SubmitButton from "@/components/form/SubmitButton";
import OrganizationDelete from "@/features/organization/components/OrganizationDelete";
import Link from 'next/link'
import MembershipDelete from "@/features/organization/components/MembershipDelete";

const OrganizationList = async ({limitedAccess}: { limitedAccess?: boolean }) => {
  const organizations = await getOrganizationsByUser()

  console.log(organizations)

  const hasActive = organizations.some(organization => organization.membershipByUser.isActive)

  return (

    <Table className="max-w-[1000px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>My Role</TableHead>
          <TableHead className="text-right">Members</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          organizations.map((organization, i) => {
            return <TableRow key={organization.id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell className="font-medium">{organization.name}</TableCell>
              <TableCell
                className="font-medium">{format(organization.membershipByUser.joinedAt, 'yyyy-MM-dd')}</TableCell>
              <TableCell className="font-medium">{organization.membershipByUser.membershipRole}</TableCell>
              <TableCell className="font-medium">{organization._count.memberships}</TableCell>
              <TableCell className="flex gap-2">

                <OrganizationSwitch
                  organizationId={organization.id}
                  trigger={<SubmitButton
                    className="w-full"
                    label={<>
                      <LucideArrowLeftRight/>
                      <span>{!hasActive ? 'Activate' : organization.membershipByUser.isActive ? "Active" : "Switch"}</span>
                    </>}
                    variant={!hasActive ? 'secondary' : organization.membershipByUser.isActive ? 'default' : 'outline'}>
                  </SubmitButton>}/>
                {
                  !limitedAccess && (
                    <>

                      {
                        organization.membershipByUser.membershipRole === 'ADMIN' && (
                          <>
                            <Button variant='outline' size="icon" asChild>
                              <Link href={`/organizations/${organization.id}/membership`}>
                                <LucideArrowUpRight/>
                              </Link>
                            </Button>

                            <Button variant='outline' size="icon">
                              <LucidePencil/>
                            </Button>

                            <OrganizationDelete
                              organizationId={organization.id}
                              trigger={
                                <Button variant='destructive' size="icon">
                                  <LucideTrash/>
                                </Button>
                              }/>

                          </>
                        )
                      }


                      <MembershipDelete
                        organizationId={organization.id}
                        userId={organization.membershipByUser.userId}
                        trigger={
                          <Button variant='destructive' size="icon">
                            <LucideLogOut/>
                          </Button>
                        }/>
                    </>
                  )
                }
              </TableCell>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  )
}


export default OrganizationList;