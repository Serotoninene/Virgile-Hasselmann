import { z } from "zod";
import { prisma } from "@server/prisma";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  get_all_videos: publicProcedure.query(() => {
    /**
     * For pagination you can have a look at this docs site
     * @link https://trpc.io/docs/useInfiniteQuery
     */

    return prisma.video.findMany();
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
