import { z } from "zod";
import { prisma } from "@server/prisma";
import { publicProcedure, router } from "../trpc";
import { videoRouter } from "./video";
import { photoRouter } from "./photo";
import { vidCatRouter } from "./vidCat";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  video: videoRouter,
  vidCat: vidCatRouter,
  photo: photoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
