import { prisma } from "@server/prisma";
import { publicProcedure, router } from "../trpc";

export const photoCatRouter = router({
  // Read
  list: publicProcedure.query(async () => {
    return await prisma.photo_Category.findMany();
  }),
});
