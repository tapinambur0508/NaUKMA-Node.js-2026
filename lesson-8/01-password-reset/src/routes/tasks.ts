import express from "express";

import * as TaskController from "../controllers/taskController";

import { validate } from "../middleware/validate";
import {
  createTaskSchema,
  replaceTaskSchema,
  updateTaskSchema,
} from "../schemas/task.schema";

const router = express.Router();
const jsonParser = express.json();

router.get("/", TaskController.getTasks);

router.get("/:id", TaskController.getTaskById);

router.post(
  "/",
  jsonParser,
  validate(createTaskSchema),
  TaskController.createTask,
);

router.delete("/:id", TaskController.deleteTask);

router.put(
  "/:id",
  jsonParser,
  validate(replaceTaskSchema),
  TaskController.replaceTask,
);

router.patch(
  "/:id",
  jsonParser,
  validate(updateTaskSchema),
  TaskController.updateTask,
);

export default router;
