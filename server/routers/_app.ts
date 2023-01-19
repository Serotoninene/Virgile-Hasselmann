import { router } from "../trpc";
import { videoRouter } from "./video";
import { photoRouter } from "./photo";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  video: videoRouter,
  photo: photoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
