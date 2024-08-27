import express from "express";
import { createStudent } from "../controllers/studentController.js";

const router = express.Router();

router.route("/register").post(createStudent);

export default router;
