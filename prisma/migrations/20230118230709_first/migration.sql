-- CreateTable
CREATE TABLE "Video" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfCreation" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "videoName" STRING NOT NULL,
    "placeholder_lq" STRING,
    "placeholder_hq" STRING NOT NULL,
    "description" STRING(1000),
    "secret" BOOL DEFAULT false,
    "published" BOOL NOT NULL DEFAULT false,
    "vid_CategoryId" STRING NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vid_Category" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Vid_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfCreation" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "photoName" STRING NOT NULL,
    "miniature" STRING NOT NULL,
    "placeholder" STRING NOT NULL,
    "description" STRING(1000),
    "test" STRING(1000),
    "published" BOOL NOT NULL DEFAULT false,
    "photo_CategoryId" STRING NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo_Category" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Photo_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "password" STRING NOT NULL,
    "status" STRING NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_vid_CategoryId_fkey" FOREIGN KEY ("vid_CategoryId") REFERENCES "Vid_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_photo_CategoryId_fkey" FOREIGN KEY ("photo_CategoryId") REFERENCES "Photo_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
