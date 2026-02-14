import express from "express";

import taskRoutes from "./tasks";

const router = express.Router();

router.use("/tasks", taskRoutes);
// router.use("/users", userRoutes);

export default router;
