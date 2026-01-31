import express, { Request, Response } from "express";

import routes from "./routes";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, Express!" });
});

app.use("/api", routes);

export default app;
