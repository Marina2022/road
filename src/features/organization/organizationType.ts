


import {Prisma} from "@prisma/client";


export type MembershipWithMetadata = Prisma.MembershipGetPayload<{
  include: {
    organization:true
  }
}>

export type OrganizationWithMetadata = Prisma.OrganizationGetPayload<{
  include: {
    memberships: true
  }
}>