import { prisma } from "@server/prisma";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const videoRouter = router({
  "get-all-videos": publicProcedure.query(async () => {
    const videos = await prisma.video.findMany();
    return videos;
  }),
  "get-videos-by-category": publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const videosByCat = await prisma.video.findMany({
        where: { category: input },
      });
      return videosByCat;
    }),
});
