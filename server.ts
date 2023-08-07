import express, { Express, Request, Response } from "express";
import { InferModel } from "drizzle-orm";
import { db } from "./database/connection";
import * as schema from "./database/schema";

export const app: Express = express();

app.get("/", async (req: Request, res: Response) => {
  // * create a new test project
  const testProject: InferModel<typeof schema.projects, "insert"> = {
    name: "test project",
    description: "test description",
  };
  await db.insert(schema.projects).values(testProject).returning();

  const projects = await db.select().from(schema.projects);
  console.log(projects);

  res.send("Hello World!");
});
