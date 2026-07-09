-- AlterTable
ALTER TABLE "ForumTopic" ADD COLUMN     "lastViewedAt" TIMESTAMP(3),
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ForumProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "signature" TEXT,
    "favoriteReplica" TEXT,
    "playStyle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForumProfile_userId_key" ON "ForumProfile"("userId");

-- CreateIndex
CREATE INDEX "ForumTopic_viewCount_idx" ON "ForumTopic"("viewCount");

-- CreateIndex
CREATE INDEX "ForumTopic_lastViewedAt_idx" ON "ForumTopic"("lastViewedAt");

-- AddForeignKey
ALTER TABLE "ForumProfile" ADD CONSTRAINT "ForumProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
