/*
  Warnings:

  - Added the required column `isActive` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
