import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eq } from "drizzle-orm";

import { db } from "../database/connection";
import { publicProcedure, router } from "../trpc";
import { users } from "../database/schema";

export const userRouter = router({
  usersList: publicProcedure.query(async () => {
    try {
      const usersList = await db.select().from(users);
      return usersList;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Cannot find all users",
      });
    }
  }),
  userById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;

    try {
      const user = await db.select().from(users).where(eq(users.id, input));

      if (user.length === 1) return user;
      else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Cannot find user by id",
        });
      }
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Cannot find user by id",
      });
    }
  }),
  userCreate: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async (opts) => {
      try {
        const user = await db.insert(users).values(opts.input).returning();
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Cannot create user",
        });
      }
    }),
});
