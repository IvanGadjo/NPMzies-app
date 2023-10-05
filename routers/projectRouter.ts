import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

import { publicProcedure, router } from "../trpc";
import { db } from "../database/connection";
import { projects, usersToProjects, users } from "../database/schema";

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

  projectsList: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async (opts) => {
      const { userId } = opts.input;

      try {
        // * find projects from users to proj table
        // const projectIds = await db.select({projectId: usersToProjects.projectId}).from(usersToProjects).where(eq(usersToProjects.userId, userId))
        // const projectIds = await db.select().from(users).where(eq(users.id, userId)).innerJoin(projects, eq(usersToProjects.projectId, projects.id))
        const projectsList = await db
          .select()
          .from(projects)
          .leftJoin(usersToProjects, eq(projects.id, usersToProjects.projectId))
          .where(eq(usersToProjects.userId, userId));

        return projectsList;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Cannot find projects list",
        });
      }
    }),

  projectUpdate: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { id, name, description } = opts.input;

      try {
        const updatedProject = await db
          .update(projects)
          .set({ name, description })
          .where(eq(projects.id, id))
          .returning();

        return updatedProject;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Cannot find projects list",
        });
      }
    }),

  projectDelete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { id } = opts.input;

      try {
        await db.delete(projects).where(eq(projects.id, id));
        await db
          .delete(usersToProjects)
          .where(eq(usersToProjects.projectId, id));
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Cannot find projects list",
        });
      }
    }),
});
