import type { Request, Response } from "express";

import type {
  CreateTaskDto,
  ReplaceTaskDto,
  UpdateTaskDto,
} from "../schemas/task.schema";

import prisma from "../lib/prisma";

import type { RequestWithUser } from "../middleware/auth";

type TaskParams = {
  id: string;
};

type GetTasksQueryParams = {
  page?: string;
  limit?: string;
};

export async function getTasks(
  req: Request<{}, {}, {}, GetTasksQueryParams>,
  res: Response,
) {
  const page = parseInt(req.query.page ?? "1", 10);
  const limit = parseInt(req.query.limit ?? "50", 10);
  const userId = (req as RequestWithUser<{}, {}, {}, GetTasksQueryParams>).user
    .id;

  const skip = (page - 1) * limit;

  const [total, tasks] = await Promise.all([
    prisma.task.count({ where: { ownerId: userId } }),
    prisma.task.findMany({
      where: { ownerId: userId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  res.json({
    data: tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  });
}

export async function getTaskById(req: Request<TaskParams>, res: Response) {
  const taskId = parseInt(req.params.id, 10);

  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (task === null) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (task.ownerId !== (req as RequestWithUser<TaskParams>).user.id) {
    // return res.status(403).json({error: "Task is not allowed"});
    return res.status(404).json({ error: "Task is not allowed" });
  }

  res.json({ data: task });
}

export async function createTask(
  req: Request<{}, {}, CreateTaskDto>,
  res: Response,
) {
  const newTask = await prisma.task.create({
    data: {
      ...req.body,
      ownerId: (req as RequestWithUser).user.id,
    },
  });

  res.status(201).json({ data: newTask });
}

export async function deleteTask(req: Request<TaskParams>, res: Response) {
  try {
    const taskId = parseInt(req.params.id, 10);
    const userId = (req as RequestWithUser<TaskParams>).user.id;

    await prisma.task.delete({ where: { id: taskId, ownerId: userId } });

    res.status(204).end();
  } catch {
    res.status(404).json({ error: "Task not found" });
  }
}

export async function replaceTask(
  req: Request<TaskParams, {}, ReplaceTaskDto>,
  res: Response,
) {
  try {
    const taskId = parseInt(req.params.id, 10);
    const userId = (req as RequestWithUser<TaskParams, {}, ReplaceTaskDto>).user
      .id;

    const replacedTask = await prisma.task.update({
      where: { id: taskId, ownerId: userId },
      data: req.body,
    });

    res.json({ data: replacedTask });
  } catch {
    res.status(404).json({ error: "Task not found" });
  }
}

export async function updateTask(
  req: Request<TaskParams, {}, UpdateTaskDto>,
  res: Response,
) {
  try {
    const taskId = parseInt(req.params.id, 10);
    const userId = (req as RequestWithUser<TaskParams, {}, ReplaceTaskDto>).user
      .id;

    const updatedTask = await prisma.task.update({
      where: { id: taskId, ownerId: userId },
      data: req.body,
    });

    res.json({ data: updatedTask });
  } catch {
    res.status(404).json({ error: "Task not found" });
  }
}
