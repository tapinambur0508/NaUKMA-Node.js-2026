import express, { Express, Request, Response } from "express";

const app: Express = express();

const TASKS = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
];

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, Express!" });
});

app.get("/tasks", (req: Request, res: Response) => {
  res.json({ data: TASKS });
});

type TaskParams = {
  id: string;
};

app.get("/tasks/:id", (req: Request<TaskParams>, res: Response) => {
  const taskId = parseInt(req.params.id, 10);

  const task = TASKS.find((task) => task.id === taskId);

  if (typeof task === "undefined") {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ data: task });
});

app.listen(8080, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running on port ${8080}`);
});
