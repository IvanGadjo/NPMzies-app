import { relations } from "drizzle-orm";
import {
  date,
  int,
  mysqlTable,
  primaryKey,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

// * MySQL tabless
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 20 }).notNull(),
  password: varchar("password", { length: 20 }).notNull(),
});

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
});

export const projectParts = mysqlTable("project_parts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  projectId: int("project_id"),
});

export const npmPackages = mysqlTable("npm_packages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  description: varchar("description", { length: 100 }),
  version: int("version"),
  lastUpdated: date("lastUpdated"),
  repoURL: varchar("repo_url", { length: 100 }),
  projectPartId: int("project_part_id"),
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
export const usersToProjects = mysqlTable(
  "users_to_projects",
  {
    userId: int("user_id")
      .notNull()
      .references(() => users.id),
    projectId: int("project_id")
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
