/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the `NavigationConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostTranslation` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `category` on table `Media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PostTranslation" DROP CONSTRAINT "PostTranslation_postId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "updatedAt",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'image',
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" SET DEFAULT 'general';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "buildStatus" TEXT,
ADD COLUMN     "date" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "pullRequestNumber" INTEGER,
ADD COLUMN     "pullRequestUrl" TEXT,
ADD COLUMN     "readTime" INTEGER,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "translationSlugs" JSONB,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SiteConfig" ALTER COLUMN "contact" DROP NOT NULL,
ALTER COLUMN "links" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'editor';

-- DropTable
DROP TABLE "NavigationConfig";

-- DropTable
DROP TABLE "Page";

-- DropTable
DROP TABLE "PostTranslation";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
