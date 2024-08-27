import express from "express";

const router = express.Router();

router.route("/products").get(getAllProducts);

export default router;
