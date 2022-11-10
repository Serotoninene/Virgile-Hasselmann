import { router } from "../trpc";
import { videoRouter } from "./video";
import { vidCatRouter } from "./vidCat";
import { photoRouter } from "./photo";
import { photoCatRouter } from "./photoCat";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  video: videoRouter,
  vidCat: vidCatRouter,
  photo: photoRouter,
  photoCat: photoCatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
