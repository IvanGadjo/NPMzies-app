import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  date,
  varchar,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

// * PostgreSQL tabless
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 20 }).notNull(),
  password: varchar("password", { length: 20 }).notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  description: varchar("description", { length: 100 }),
});

export const projectParts = pgTable("project_parts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  projectId: integer("project_id"),
});

export const npmPackages = pgTable("npm_packages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  description: varchar("description", { length: 100 }),
  version: integer("version"),
  lastUpdated: date("lastUpdated"),
  repoURL: varchar("repo_url", { length: 100 }),
  projectPartId: integer("project_part_id"),
});

// * Relations
export const usersRelations = relations(users, ({ many }) => ({
  usersToProjects: many(usersToProjects),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  usersToProjects: many(usersToProjects),
  projectParts: many(projectParts),
}));

export const projectPartsRelations = relations(
  projectParts,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [projectParts.projectId],
      references: [projects.id],
    }),
    npmPackages: many(npmPackages),
  })
);

export const npmPackagesRelations = relations(npmPackages, ({ one }) => ({
  projectPart: one(projectParts, {
    fields: [npmPackages.projectPartId],
    references: [projectParts.id],
  }),
}));

// * M-N relations
export const usersToProjects = pgTable(
  "users_to_projects",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.projectId),
  })
);

export const usersToProjectsRelations = relations(
  usersToProjects,
  ({ one }) => ({
    group: one(projects, {
      fields: [usersToProjects.projectId],
      references: [projects.id],
    }),
    user: one(users, {
      fields: [usersToProjects.userId],
      references: [users.id],
    }),
  })
);
