import { z } from "zod";
import { prisma } from "@server/prisma";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  get_all_videos: publicProcedure.query(async () => {
    const videos = await prisma.video.findMany();
    console.log(videos);
    return videos;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
