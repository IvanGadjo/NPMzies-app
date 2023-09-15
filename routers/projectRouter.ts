import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { publicProcedure, router } from "../trpc";
import { db } from "../database/connection";
import { projects, usersToProjects } from "../database/schema";

export const projectRouter = router({
  projectCreate: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        userId: z.number(), // ! Mozda ne treba da e number?
      })
    )
    .mutation(async (opts) => {
      const { userId, name, description } = opts.input;

      try {
        const project = await db
          .insert(projects)
          .values({
            name,
            description,
          })
          .returning();

        await db
          .insert(usersToProjects)
          .values({ userId, projectId: project[0].id });
        return project;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Cannot create project",
        });
      }
    }),
});
