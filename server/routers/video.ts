import { prisma } from "@server/prisma";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const videoRouter = router({
  // create
  create: publicProcedure
    .input(
      z.object({
        id: z.bigint(),
        title: z.string(),
        dateOfCreation: z.date(),
        videoName: z.string(),
        placeholder_lq: z.string().or(z.undefined()),
        placeholder_hq: z.string(),
        description: z.string().or(z.undefined()),
        vid_CategoryId: z.bigint(),
      })
    )
    .mutation(async ({ input }) => {
      const newVideo = await prisma.video.create({ data: input });
      return { success: true, video: newVideo };
    }),
  // Read
  list: publicProcedure.query(async () => {
    return await prisma.video.findMany();
  }),
  // Update
  update: publicProcedure
    .input(
      z.object({
        id: z.bigint(),
        title: z.string(),
        dateOfCreation: z.string(),
        videoName: z.string(),
        placeholder_lq: z.string().or(z.undefined()),
        placeholder_hq: z.string(),
        description: z.string().or(z.undefined()),
        vid_CategoryId: z.bigint(),
      })
    )
    .mutation(async ({ input }) => {
      const updatedVideo = await prisma.video.update({
        where: { id: input.id },
        data: {
          title: input.title,
          dateOfCreation: new Date(input.dateOfCreation),
          videoName: input.videoName,
          placeholder_lq: input.placeholder_lq,
          placeholder_hq: input.placeholder_hq,
          description: input.description,
          vid_CategoryId: input.vid_CategoryId,
        },
      });
      return { success: true, video: updatedVideo };
    }),
  // Delete
  delete: publicProcedure.input(z.bigint()).mutation(async ({ input }) => {
    await prisma.video.delete({ where: { id: input } });
  }),
});
