import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import students from "./routes/studentRoutes.js";
import errorMiddleware from "./middleware/error.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Config Dotenv
dotenv.config({ path: "backend/config/config.env" });

app.use("/api/v1", students);

// Middleware for Errors
app.use(errorMiddleware);

export default app;
