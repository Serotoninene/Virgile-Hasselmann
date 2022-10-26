/*
  Warnings:

  - You are about to drop the column `category` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "category";
