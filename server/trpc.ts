import { Context } from "./context";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson, // IMPORTANT : without it -> no data is retrieved from trpc (because I use bigint and date in my schemas I guess)
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
