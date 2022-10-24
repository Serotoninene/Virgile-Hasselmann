-- CreateTable
CREATE TABLE "Video" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfCreation" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "videoName" STRING NOT NULL,
    "placeholder" STRING NOT NULL,
    "category" STRING NOT NULL,
    "description" STRING(1000),
    "published" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfCreation" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "photoName" STRING NOT NULL,
    "placeholder" STRING NOT NULL,
    "category" STRING NOT NULL,
    "description" STRING(1000),
    "published" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfCreation" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "photoName" STRING NOT NULL,
    "placeholder" STRING NOT NULL,
    "category" STRING NOT NULL,
    "description" STRING(1000),
    "published" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);
