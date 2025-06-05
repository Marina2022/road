import React from 'react';
import {getOrganizationsByUser} from "@/features/organization/organizationActions";
import {format} from 'date-fns';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {LucideArrowLeftRight, LucideArrowUpRight, LucidePencil, LucideTrash} from "lucide-react";
import OrganizationSwitch from "@/features/organization/components/OrganizationSwitch";
import SubmitButton from "@/components/form/SubmitButton";

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser()
  
  const hasActive = organizations.some(organization=>organization.membershipByUser.isActive) 
    
  return (

    <Table className="max-w-[1000px]">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Joined At</TableHead>
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
              <TableCell className="font-medium">{organization._count.memberships}</TableCell>
              <TableCell className="flex gap-2">

                <OrganizationSwitch
                  organizationId={organization.id}
                  trigger={<SubmitButton 
                    label={<>
                      <LucideArrowLeftRight/>
                      <span>{!hasActive ? 'Activate' : organization.membershipByUser.isActive ? "Active" : "Switch"}</span>
                    </>}
                    
                    variant={!hasActive ? 'secondary' : organization.membershipByUser.isActive ? 'default' : 'outline'} >                    
                    
                  </SubmitButton>}/>


                <Button variant='outline' size="icon">
                  <LucideArrowUpRight/>
                </Button>

                <Button variant='outline' size="icon">
                  <LucidePencil/>
                </Button>

                <Button variant='destructive' size="icon">
                  <LucideTrash/>
                </Button>
              </TableCell>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  )
}


export default OrganizationList;