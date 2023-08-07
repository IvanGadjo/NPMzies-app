import { app } from "./server";

(async () => {
  try {
    app.listen(3002, () => {
      console.log("NPMzies started on port 3002");
    });
  } catch (error) {
    console.error("Failed to start the app: ", error);
  }
})();
