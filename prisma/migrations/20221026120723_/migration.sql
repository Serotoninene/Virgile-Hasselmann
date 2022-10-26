/*
  Warnings:

  - You are about to drop the column `placeholder` on the `Video` table. All the data in the column will be lost.
  - Added the required column `miniature` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_CategoryId` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeholder_hq` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vid_CategoryId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "miniature" STRING NOT NULL;
ALTER TABLE "Photo" ADD COLUMN     "photo_CategoryId" INT8 NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "placeholder";
ALTER TABLE "Video" ADD COLUMN     "placeholder_hq" STRING NOT NULL;
ALTER TABLE "Video" ADD COLUMN     "placeholder_lq" STRING;
ALTER TABLE "Video" ADD COLUMN     "vid_CategoryId" INT8 NOT NULL;

-- CreateTable
CREATE TABLE "Vid_Category" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,

    CONSTRAINT "Vid_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo_Category" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,

    CONSTRAINT "Photo_Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_vid_CategoryId_fkey" FOREIGN KEY ("vid_CategoryId") REFERENCES "Vid_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_photo_CategoryId_fkey" FOREIGN KEY ("photo_CategoryId") REFERENCES "Photo_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
