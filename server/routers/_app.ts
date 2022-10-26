import { z } from "zod";
import { prisma } from "@server/prisma";
import { publicProcedure, router } from "../trpc";
import { videoRouter } from "./video";
import { photoRouter } from "./photo";
import { vidCatRouter } from "./vidCat";

export const appRouter = router({
  get_all_videos: publicProcedure.query(() => {
    return prisma.video.findMany();
  }),
  vidCat: vidCatRouter,
  video: videoRouter,
  photo: photoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
