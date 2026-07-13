-- CreateTable
CREATE TABLE "GameField" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameFieldPhoto" (
    "id" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameFieldPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSlide_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameField_slug_key" ON "GameField"("slug");

-- CreateIndex
CREATE INDEX "GameField_createdAt_idx" ON "GameField"("createdAt");

-- CreateIndex
CREATE INDEX "GameFieldPhoto_fieldId_createdAt_idx" ON "GameFieldPhoto"("fieldId", "createdAt");

-- CreateIndex
CREATE INDEX "HeroSlide_isActive_order_idx" ON "HeroSlide"("isActive", "order");

-- AddForeignKey
ALTER TABLE "GameField" ADD CONSTRAINT "GameField_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameFieldPhoto" ADD CONSTRAINT "GameFieldPhoto_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "GameField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameFieldPhoto" ADD CONSTRAINT "GameFieldPhoto_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroSlide" ADD CONSTRAINT "HeroSlide_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
