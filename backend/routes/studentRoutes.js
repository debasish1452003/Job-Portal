import express from "express";
import { createStudent } from "../controllers/studentController.js";
// import {
//   isAuthenticatedStudent,
//     authorizeRoles,
// } from "../middleware/studentAuth.js";

const router = express.Router();

router.route("/register").post(createStudent);
router.route("/login").post(login);

export default router;
