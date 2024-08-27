import express from "express";
import { createStudent,login } from "../controllers/studentController.js";

const router = express.Router();

router.route("/register").post(createStudent);
router.route("/login").post(login);

export default router;
