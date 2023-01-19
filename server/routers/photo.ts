import { prisma } from "@server/prisma";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const photoRouter = router({
  // Create
  create: publicProcedure
    .input(
      z.object({
        title: z.string().or(z.undefined()),
        dateOfCreation: z.date().or(z.undefined()),
        photoName: z.string(),
        miniature: z.string().or(z.undefined()),
        placeholder: z.string().or(z.undefined()),
        description: z.string().or(z.undefined()),
        isSecret: z.boolean().or(z.undefined()),
      })
    )
    .mutation(async ({ input }) => {
      console.log("pr");
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
        id: z.string(),
        title: z.string().or(z.undefined()),
        dateOfCreation: z.date().or(z.undefined()),
        photoName: z.string(),
        miniature: z.string().or(z.undefined()),
        placeholder: z.string().or(z.undefined()),
        description: z.string().or(z.undefined()),
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
        },
      });
      return { success: true, photo: updatePhoto };
    }),
  // Delete
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await prisma.photo.delete({ where: { id: input } });
  }),
});
