import express from "express";

import * as TaskController from "../controllers/taskController";
// import {getTasks, getTaskById} from "../controllers/taskController";

const router = express.Router();
const jsonParser = express.json();

router.get("/", TaskController.getTasks);

router.get("/:id", TaskController.getTaskById);

router.post("/", jsonParser, TaskController.createTask);

router.delete("/:id", TaskController.deleteTask);

router.put("/:id", jsonParser, TaskController.replaceTask);

router.patch("/:id", jsonParser, TaskController.updateTask);

export default router;
