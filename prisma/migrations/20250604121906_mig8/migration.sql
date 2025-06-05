-- CreateTable
CREATE TABLE "emailVerificationToken" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "emailVerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "emailVerificationToken_userId_idx" ON "emailVerificationToken"("userId");

-- AddForeignKey
ALTER TABLE "emailVerificationToken" ADD CONSTRAINT "emailVerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
