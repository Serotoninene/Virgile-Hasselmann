import { prisma } from "@server/prisma";

import { router, publicProcedure } from "../trpc";

export const photoRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.photo.findMany();
  }),
});
