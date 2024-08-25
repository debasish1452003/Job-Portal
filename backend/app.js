import express from "express";
import dotenv from "dotenv";

const app = express();

// Config Dotenv

dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());

export default app;
