import { prisma } from "@server/prisma";

import { router, publicProcedure } from "../trpc";

export const photoRouter = router({
  "get-all-photos": publicProcedure.query(async () => {
    const photos = await prisma.photo.findMany();
    return photos;
  }),
});
