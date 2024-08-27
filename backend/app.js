import express from "express";
import dotenv from "dotenv";

import students from "./routes/studentRoutes.js";

const app = express();
app.use(express.json());

// Config Dotenv
dotenv.config({ path: "backend/config/config.env" });

app.use("/api/v1", students);

export default app;
