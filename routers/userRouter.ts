import { db } from "../database/connection";
import { publicProcedure, router } from "../trpc";
// import * as schema from "../database/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { users } from "../database/schema";

export const userRouter = router({
  usersList: publicProcedure.query(async () => {
    try {
      const usersList = await db.select().from(users);
      return usersList;
    } catch (error) {
      throw new Error("Cannot find all users"); // ! Maybe use TRPCError
      // throw new TRPCError({
      //   code: 'UNAUTHORIZED',
      //   message: 'You are not authorized',
      // })
    }
  }),
  userById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;

    try {
      const user = await db.select().from(users).where(eq(users.id, input));

      if (user.length === 1) return user;
      else {
        // ! Throw new error
      }
    } catch (error) {
      throw new Error("Cannot find user by id");
    }
  }),
  userCreate: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async (opts) => {
      try {
        const user = await db.insert(users).values(opts.input).returning();
        return user;
      } catch (error) {
        throw new Error("Cannot create user");
      }
    }),
});
