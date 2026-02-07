import type { Request, Response } from "express";

import type { Task } from "../types/task";
import type {
  CreateTaskDto,
  ReplaceTaskDto,
  UpdateTaskDto,
} from "../schemas/task.schema";

const TASKS: Task[] = [
  { id: 1, title: "Task 1", description: "Lorem ipsum", completed: false },
  { id: 2, title: "Task 2", description: "Lorem ipsum", completed: true },
  { id: 3, title: "Task 3", description: "Lorem ipsum", completed: false },
];

type TaskParams = {
  id: string;
};

export function getTasks(req: Request, res: Response) {
  res.json({ data: TASKS });
}

export function getTaskById(req: Request<TaskParams>, res: Response) {
  const taskId = parseInt(req.params.id, 10);

  const task = TASKS.find((task) => task.id === taskId);

  if (typeof task === "undefined") {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ data: task });
}

export function createTask(req: Request<{}, {}, CreateTaskDto>, res: Response) {
  const { title, description } = req.body;

  const task: Task = {
    id: TASKS.length + 1,
    title,
    description,
    completed: false,
  };

  TASKS.push(task);

  res.status(201).json({ data: task });
}

export function deleteTask(req: Request<TaskParams>, res: Response) {
  const taskId = parseInt(req.params.id, 10);

  const taskIndex = TASKS.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = TASKS.splice(taskIndex, 1);

  // // Solution 1
  // res.status(200).json({data: deletedTask[0]});

  // Solution
  res.status(204).end();
}

export const replaceTask = (
  req: Request<TaskParams, {}, ReplaceTaskDto>,
  res: Response,
) => {
  const id = +req.params.id;
  const { title, completed, description } = req.body;

  const taskIndex = TASKS.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const newTask: Task = {
    id,
    title,
    description,
    completed,
  };
  TASKS[taskIndex] = newTask;

  res.json({ data: newTask });
};

export const updateTask = (
  req: Request<TaskParams, {}, UpdateTaskDto>,
  res: Response,
) => {
  const id = +req.params.id;
  const { title, description, completed } = req.body;
  const taskIndex = TASKS.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  TASKS[taskIndex] = {
    ...TASKS[taskIndex],
    ...req.body,
  };

  res.json(TASKS[taskIndex]);
};
