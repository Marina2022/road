-- CreateEnum
CREATE TYPE "Entity" AS ENUM ('COMMENT', 'TICKET');

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "commentId" TEXT,
ADD COLUMN     "entity" "Entity" NOT NULL DEFAULT 'COMMENT',
ALTER COLUMN "ticketId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Attachment_commentId_idx" ON "Attachment"("commentId");

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
