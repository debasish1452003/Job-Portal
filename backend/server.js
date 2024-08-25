import app from "./app.js";

import colors from "colors";
import dotenv from "dotenv";

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the Server due to Uncaught Exception`);
  process.exit(1);
});

// Config

dotenv.config({ path: "config/config.env" });

const server = app.listen(process.env.PORT, () => {
  console.log(
    colors.bgMagenta.white(
      `Server is working on http://localhost:${process.env.PORT}`
    )
  );
});
