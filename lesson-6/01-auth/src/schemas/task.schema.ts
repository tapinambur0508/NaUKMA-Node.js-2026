import * as z from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(5, "Description must be more than 5 characters")
    .max(500, "Title must be less than 500 characters"),
});

export const replaceTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(5, "Description must be more than 5 characters")
    .max(500, "Title must be less than 500 characters"),
  completed: z.boolean(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .optional(),
  description: z
    .string()
    .min(5, "Description must be more than 5 characters")
    .max(500, "Title must be less than 500 characters")
    .optional(),
  completed: z.boolean().optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type ReplaceTaskDto = z.infer<typeof replaceTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
