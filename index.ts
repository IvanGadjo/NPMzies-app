import { db } from "./database/connection";
import { app } from "./server";

// app.listen(3002, () => {
//   console.log("NPMzies started on port 3002");
// });

(async () => {
  try {
    app.listen(3002, () => {
      console.log("NPMzies started on port 3002");
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
})();
