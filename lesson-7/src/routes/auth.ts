import express from "express";

import {
  registerController,
  loginController,
} from "../controllers/authController";

import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = express.Router();
const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validate(registerSchema),
  registerController,
);

router.post("/login", jsonParser, validate(loginSchema), loginController);

export default router;
