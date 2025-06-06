import React from 'react';
import {getMemberships} from "@/features/organization/organizationActions";
import {format} from 'date-fns';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {LucideArrowUpRight, LucideLogOut, LucidePencil} from "lucide-react";
import MembershipDelete from './MembershipDelete';

const MembersList = async ({organizationId}: { organizationId: string }) => {

  const members = await getMemberships(organizationId);

  return (

    <Table className="max-w-[1000px]">      
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email verified</TableHead>
          <TableHead >Joined At</TableHead>
          <TableHead >Role</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          members.map((member, i) => {

                        
            return <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>

              <TableCell className="font-medium">{member.user.email}</TableCell>
              <TableCell className="font-medium">{member.user.username}</TableCell>
              <TableCell className="font-medium">{member.user.emailVerified ? 'Verified' : 'Not Verified'}</TableCell>
              <TableCell
                className="font-medium">{format(member.joinedAt, 'yyyy-MM-dd')}
              </TableCell>
              <TableCell
                className="font-medium">{member.membershipRole}
              </TableCell>

              <TableCell className="flex gap-2">
                <Button variant='outline' size="icon" asChild>
                  <LucideArrowUpRight/>
                </Button>

                <Button variant='outline' size="icon">
                  <LucidePencil/>
                </Button>

                <MembershipDelete
                  organizationId={member.organizationId}
                  userId={member.userId}
                  trigger={
                    <Button variant='destructive' size="icon">
                      <LucideLogOut/>
                    </Button>
                  }/>
              </TableCell>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  )
}


export default MembersList;