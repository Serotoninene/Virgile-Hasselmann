import { prisma } from "@server/prisma";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const vidCatRouter = router({
  // Read
  list: publicProcedure.query(async () => {
    return await prisma.vid_Category.findMany();
  }),
});
