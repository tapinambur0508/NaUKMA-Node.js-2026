import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StringValue } from "ms";

import type { Request, Response } from "express";

import { RegisterDTO, LoginDTO } from "../schemas/auth.schema";

import prisma from "../lib/prisma";

import CONFIG from "../config";

export async function registerController(
  req: Request<{}, {}, RegisterDTO>,
  res: Response,
) {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser !== null) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.json({ message: "Registration completed" });
}

export async function loginController(
  req: Request<{}, {}, LoginDTO>,
  res: Response,
) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user === null) {
    console.log("Email is incorrect");
    return res.status(401).json({ message: "Email or password is incorrect" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid !== true) {
    console.log("Password is incorrect");
    return res.status(401).json({ message: "Email or password is incorrect" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role,
    },
    CONFIG.jwtSecret,
    {
      expiresIn: CONFIG.jwtExpiresIn as StringValue,
    },
  );

  res.json({
    data: {
      accessToken: token,
    },
  });
}
