import express, { Express, Request, Response } from "express";
import { InferModel } from "drizzle-orm";
import { db } from "./database/connection";
import * as schema from "./database/schema";
import morgan from "morgan";

export const app: Express = express();

app.use(morgan("combined"));

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

app.get("/hello", async (req: Request, res: Response) => {
  console.log("Hello World on da server!");
  res.send("Hello World!");
});
