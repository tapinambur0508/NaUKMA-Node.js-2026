import path from "node:path";

import express, { Request, Response } from "express";

import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

import routes from "./routes";

const app = express();

app.use("/avatars", express.static(path.resolve("src", "uploads", "avatars")));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, Express!" });
});

app.use("/api", routes);

// Handle not found
app.use(notFound);

// Handle server error
app.use(errorHandler);

export default app;
