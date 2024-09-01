import app from "./app.js";

import colors from "colors";
import dotenv from "dotenv";
import ConnectDatabase from "./config/database.js";
import cloudinary from "cloudinary";

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the Server due to Uncaught Exception`);
  process.exit(1);
});

// Config

dotenv.config({ path: "config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connecting Database
ConnectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    colors.bgMagenta.white(
      `Server is working on http://localhost:${process.env.PORT}`
    )
  );
});
