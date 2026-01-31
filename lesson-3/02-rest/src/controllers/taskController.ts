import type { Request, Response } from "express";

import type { Task } from "../types/task";

const TASKS: Task[] = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
];

type TaskParams = {
  id: string;
};

type CreateTaskBody = {
  title: string;
};

type ReplaceTaskBody = {
  title: string;
  completed: boolean;
};

type UpdateTaskBody = {
  title?: string;
  completed?: boolean;
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

export function createTask(
  req: Request<{}, {}, CreateTaskBody>,
  res: Response,
) {
  const { title } = req.body;

  const task: Task = {
    id: TASKS.length + 1,
    title,
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
  req: Request<TaskParams, {}, ReplaceTaskBody>,
  res: Response,
) => {
  const id = +req.params.id;
  const { completed, title } = req.body;

  if (completed == null || title == null) {
    return res.status(404).json({ error: "Bad request" });
  }

  const taskIndex = TASKS.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const newTask = {
    id,
    title,
    completed,
  };
  TASKS[taskIndex] = newTask;

  res.json({ data: newTask });
};

export const editTask = (
  req: Request<TaskParams, {}, UpdateTaskBody>,
  res: Response,
) => {
  const id = +req.params.id;
  // const { completed, title } = req.body;
  const taskIndex = TASKS.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  TASKS[taskIndex] = {
    ...TASKS[taskIndex],
    // ...(completed !== undefined && { completed }),
    // ...(title !== undefined && { title }),
    ...req.body,
  };

  res.json(TASKS[taskIndex]);
};
