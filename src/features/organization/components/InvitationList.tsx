import React from 'react';
import {getInvitations} from "@/features/organization/organizationActions";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {LucideArrowUpRight, LucidePencil} from "lucide-react";
import {format} from "date-fns";

type InvitationListProps = {
  organizationId: string;
}

const InvitationList = async ({organizationId}: InvitationListProps) => {
  const invitations = await getInvitations({organizationId});
   
  if (!invitations.length) return <div className="text-center">No invitations yet</div>
  
  return (
    <Table className="max-w-[1000px]">
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Invited At</TableHead>
          <TableHead>Invited By</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          invitations.map((invitation, i) => {
            return <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>

              <TableCell className="font-medium">{invitation.email}</TableCell>
              <TableCell className="font-medium">{format(new Date(invitation.createdAt), 'yyyy-MM-dd')}</TableCell>
              <TableCell className="font-medium">{invitation.invitedByUser ? invitation.invitedByUser.username : "Deleted user"}</TableCell>
          
              <TableCell className="flex gap-2">
                <Button variant='outline' size="icon" asChild>
                  <LucideArrowUpRight/>
                </Button>

                <Button variant='outline' size="icon">
                  <LucidePencil/>
                </Button>

                {/*<MembershipDelete*/}
                {/*  organizationId={member.organizationId}*/}
                {/*  userId={member.userId}*/}
                {/*  trigger={*/}
                {/*    <Button variant='destructive' size="icon">*/}
                {/*      <LucideLogOut/>*/}
                {/*    </Button>*/}
                {/*  }/>*/}
              </TableCell>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  );
};

export default InvitationList;