import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import students from "./routes/studentRoutes.js";
import university from "./routes/universityRoutes.js";
import employer from "./routes/employerRoutes.js";
import job from "./routes/jobRoutes.js";
import auth from "./routes/authRoutes.js";

import errorMiddleware from "./middleware/error.js";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Config Dotenv
dotenv.config({ path: "backend/config/config.env" });

app.use("/api/v1", students);
app.use("/api/v1", university);
app.use("/api/v1", employer);
app.use("/api/v1", job);
app.use("/api/v1", auth);

// Middleware for Errors
app.use(errorMiddleware);

export default app;
