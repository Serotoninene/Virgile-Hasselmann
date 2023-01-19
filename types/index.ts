import { Prisma } from "@prisma/client";

// not useful anymore cause I got rid of the categories but I'm keeping it for reference

const videoWithCategories = Prisma.validator<Prisma.VideoArgs>()({
  include: { Vid_Category: true },
});

const photoWithCategories = Prisma.validator<Prisma.PhotoArgs>()({
  include: { Photo_Category: true },
});

export type VideoWithCategories = Prisma.VideoGetPayload<
  typeof videoWithCategories
>;

export type PhotoWithCategories = Prisma.PhotoGetPayload<
  typeof photoWithCategories
>;
