import express from "express";
import dotenv from "dotenv";
import products from "./routes/productRoute.js";

const app = express();
app.use(express.json());

// Config Dotenv
dotenv.config({ path: "backend/config/config.env" });

app.use("/api/v1", products);

export default app;
