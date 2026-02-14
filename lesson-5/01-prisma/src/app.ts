import express, { Request, Response, NextFunction } from "express";

import routes from "./routes";

const app = express();

function middleware1(req: Request, res: Response, next: NextFunction) {
  console.log("I like Express");
  next();
}

// Auth middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.query["api-key"];

  if (apiKey !== "123456789") {
    return res.status(401).json({ message: "Please provide a valid api key" });
  }

  next();
});

const compound = [middleware1, middleware1, middleware1];

app.get("/", compound, (req: Request, res: Response) => {
  res.json({ message: "Hello, Express!" });
});

// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);

app.use("/api", routes);

export default app;
