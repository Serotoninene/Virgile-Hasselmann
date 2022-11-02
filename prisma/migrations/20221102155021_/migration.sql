/*
  Warnings:

  - You are about to alter the column `id` on the `Photo` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `photo_CategoryId` on the `Photo` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Photo_Category` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `User` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Vid_Category` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Video` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `vid_CategoryId` on the `Video` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Photo" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfCreation" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "photoName" STRING NOT NULL,
    "miniature" STRING NOT NULL,
    "placeholder" STRING NOT NULL,
    "description" STRING(1000),
    "published" BOOL NOT NULL DEFAULT false,
    "photo_CategoryId" STRING NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Photo" ("createdAt","dateOfCreation","description","id","miniature","photoName","photo_CategoryId","placeholder","published","title") SELECT "createdAt","dateOfCreation","description","id","miniature","photoName","photo_CategoryId","placeholder","published","title" FROM "Photo";
DROP TABLE "Photo" CASCADE;
ALTER TABLE "_prisma_new_Photo" RENAME TO "Photo";
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_photo_CategoryId_fkey" FOREIGN KEY ("photo_CategoryId") REFERENCES "Photo_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_Photo_Category" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Photo_Category_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Photo_Category" ("id","name") SELECT "id","name" FROM "Photo_Category";
DROP TABLE "Photo_Category" CASCADE;
ALTER TABLE "_prisma_new_Photo_Category" RENAME TO "Photo_Category";
CREATE TABLE "_prisma_new_User" (
    "id" STRING NOT NULL,
    "password" STRING NOT NULL,
    "status" STRING NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_User" ("id","password","status") SELECT "id","password","status" FROM "User";
DROP TABLE "User" CASCADE;
ALTER TABLE "_prisma_new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");
CREATE TABLE "_prisma_new_Vid_Category" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Vid_Category_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Vid_Category" ("id","name") SELECT "id","name" FROM "Vid_Category";
DROP TABLE "Vid_Category" CASCADE;
ALTER TABLE "_prisma_new_Vid_Category" RENAME TO "Vid_Category";
CREATE TABLE "_prisma_new_Video" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfCreation" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "videoName" STRING NOT NULL,
    "placeholder_lq" STRING,
    "placeholder_hq" STRING NOT NULL,
    "description" STRING(1000),
    "published" BOOL NOT NULL DEFAULT false,
    "vid_CategoryId" STRING NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Video" ("createdAt","dateOfCreation","description","id","placeholder_hq","placeholder_lq","published","title","vid_CategoryId","videoName") SELECT "createdAt","dateOfCreation","description","id","placeholder_hq","placeholder_lq","published","title","vid_CategoryId","videoName" FROM "Video";
DROP TABLE "Video" CASCADE;
ALTER TABLE "_prisma_new_Video" RENAME TO "Video";
ALTER TABLE "Video" ADD CONSTRAINT "Video_vid_CategoryId_fkey" FOREIGN KEY ("vid_CategoryId") REFERENCES "Vid_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
