import { prisma } from "@server/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { router, publicProcedure } from "../trpc";

const salt = bcrypt.genSaltSync(10);

export const userRouter = router({
  // signUp
  signUp: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const hash = bcrypt.hashSync(input, salt);
    const user = await prisma.user.create({ data: { password: hash } });
    return user;
  }),
  // login
  login: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const users = await prisma.user.findMany();
    let admin;
    for (let i = 0; i < users.length; i++) {
      if (await bcrypt.compare(input, users[0].password)) {
        admin = users[0].status;
        return admin;
      } else {
        admin = "USER";
        return admin;
      }
    }

    return admin;
  }),
});
