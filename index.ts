import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import * as trpcExpress from "@trpc/server/adapters/express";

import { router } from "./trpc";
import { userRouter } from "./routers/userRouter";
import { createContext } from "./trpc";

const appRouter = router({
  user: userRouter,
});
export type AppRouter = typeof appRouter;

// * Express stuff
async function main() {
  const app: Express = express();

  app.use(morgan("short"));

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  try {
    app.listen(3002, () => {
      console.log("NPMzies started on port 3002");
    });
  } catch (error) {
    console.error("Failed to start the app: ", error);
  }
}

main();
