-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "githubMerged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "githubMergedAt" TIMESTAMP(3),
ADD COLUMN     "githubPrNumber" INTEGER,
ADD COLUMN     "githubPrUrl" TEXT;
