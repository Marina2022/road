/*
  Warnings:

  - The primary key for the `Membership` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('MEMBER', 'ADMIN');

-- AlterTable
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_pkey",
ADD COLUMN     "membershipRole" "MembershipRole" NOT NULL DEFAULT 'MEMBER',
ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("userId", "organizationId");
