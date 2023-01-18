/*
  Warnings:

  - You are about to drop the column `photo_CategoryId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `test` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `secret` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `vid_CategoryId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `Photo_Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vid_Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_photo_CategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_vid_CategoryId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "photo_CategoryId";
ALTER TABLE "Photo" DROP COLUMN "test";
ALTER TABLE "Photo" ADD COLUMN     "isSecret" BOOL DEFAULT false;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "secret";
ALTER TABLE "Video" DROP COLUMN "vid_CategoryId";
ALTER TABLE "Video" ADD COLUMN     "isSecret" BOOL DEFAULT false;

-- DropTable
DROP TABLE "Photo_Category";

-- DropTable
DROP TABLE "Vid_Category";
