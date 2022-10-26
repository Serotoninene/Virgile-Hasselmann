import { z } from "zod";
import { prisma } from "@server/prisma";
import { publicProcedure, router } from "../trpc";
import { videoRouter } from "./video";
import { photoRouter } from "./photo";

export const appRouter = router({
  get_all_videos: publicProcedure.query(() => {
    return prisma.video.findMany();
  }),
  video: videoRouter,
  photo: photoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
