import { db } from "../database/connection";
import { publicProcedure, router } from "../trpc";
import * as schema from "../database/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const userRouter = router({
  usersList: publicProcedure.query(async () => {
    const users = await db.select().from(schema.users);
    return users;
  }),
  userById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, input));

    if (user.length === 1) return user;
    else {
      // ! Throw new error
    }
  }),
});
