import express from "express";

import { auth } from "../middleware/auth";

import authRoutes from "./auth";
import taskRoutes from "./tasks";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", auth, taskRoutes);

export default router;
