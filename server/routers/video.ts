import { prisma } from "@server/prisma";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const videoRouter = router({
  // create
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        dateOfCreation: z.date(),
        videoName: z.string().or(z.undefined()),
        placeholder_lq: z.string().or(z.undefined()),
        placeholder_hq: z.string(),
        videoLink: z.string().or(z.undefined()),
        description: z.string().or(z.undefined()),
        isSecret: z.boolean().or(z.undefined()),
      })
    )
    .mutation(async ({ input }) => {
      const newVideo = await prisma.video.create({ data: input });
      return { success: true, video: newVideo };
    }),
  // Read
  list: publicProcedure.query(async () => {
    const allVideos = await prisma.video.findMany();
    return allVideos;
  }),
  byId: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.video.findFirst({ where: { id: input } });
  }),
  // Update
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().or(z.undefined()),
        dateOfCreation: z.date(),
        videoName: z.string(),
        placeholder_lq: z.string().or(z.undefined()),
        placeholder_hq: z.string(),
        description: z.string().or(z.undefined()),
        isSecret: z.boolean().or(z.undefined()),
      })
    )
    .mutation(async ({ input }) => {
      const updatedVideo = await prisma.video.update({
        where: { id: input.id },
        data: {
          title: input.title,
          dateOfCreation: input.dateOfCreation,
          videoName: input.videoName,
          placeholder_lq: input.placeholder_lq,
          placeholder_hq: input.placeholder_hq,
          isSecret: input.isSecret,
        },
      });
      return { success: true, video: updatedVideo };
    }),
  // Delete
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await prisma.video.delete({ where: { id: input } });
  }),
});
