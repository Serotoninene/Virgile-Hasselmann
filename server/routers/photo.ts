import { prisma } from "@server/prisma";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const photoRouter = router({
  // Create
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        dateOfCreation: z.date(),
        photoName: z.string(),
        miniature: z.string(),
        placeholder: z.string(),
        description: z.string().or(z.undefined()),
        photo_CategoryId: z.bigint(),
      })
    )
    .mutation(async ({ input }) => {
      const newPhoto = await prisma.photo.create({ data: input });
      return { success: true, photo: newPhoto };
    }),
  // Read
  list: publicProcedure.query(async () => {
    return await prisma.photo.findMany();
  }),
  // Update
  update: publicProcedure
    .input(
      z.object({
        id: z.bigint(),
        title: z.string(),
        dateOfCreation: z.date(),
        photoName: z.string(),
        miniature: z.string(),
        placeholder: z.string(),
        description: z.string().or(z.undefined()),
        photo_CategoryId: z.bigint(),
      })
    )
    .mutation(async ({ input }) => {
      const updatePhoto = await prisma.photo.update({
        where: { id: input.id },
        data: {
          title: input.title,
          dateOfCreation: input.dateOfCreation,
          photoName: input.photoName,
          miniature: input.miniature,
          placeholder: input.placeholder,
          description: input.description,
          photo_CategoryId: input.photo_CategoryId,
        },
      });
      return { success: true, photo: updatePhoto };
    }),
  // Delete
  delete: publicProcedure.input(z.bigint()).mutation(async ({ input }) => {
    await prisma.photo.delete({ where: { id: input } });
  }),
});
