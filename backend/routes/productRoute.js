import express from "express";
import { getAllProducts } from "../controllers/productControllers.js"; // Ensure the file extension is correct

const router = express.Router();

router.route("/products").get(getAllProducts);

export default router;
