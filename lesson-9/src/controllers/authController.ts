import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StringValue } from "ms";

import type { NextFunction, Request, Response } from "express";

import {
  RegisterDTO,
  LoginDTO,
  RequestPassWordResetDTO,
  ResetPasswordDTO,
} from "../schemas/auth.schema";

import prisma from "../lib/prisma";

import sendMail from "../utils/sendMail";

import type { ResetPasswordPayload } from "../types/auth";

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

export async function requestPasswordResetController(
  req: Request<{}, {}, RequestPassWordResetDTO>,
  res: Response,
) {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user !== null) {
    const token = jwt.sign(
      {
        email: user.email,
      },
      CONFIG.jwtSecret,
      {
        expiresIn: "10m",
      },
    );

    await sendMail({
      to: user.email,
      subject: "Reset password",
      text: `To reset password please open this link: http://localhost:3000/restore_password?token=${token}`,
      html: `<p>To reset password please open this <a href="http://localhost:3000/restore_password?token=${token}">link</a></p>`,
    });
  }

  res.json({ message: "Message sent successfully" });
}

export async function resetPasswordController(
  req: Request<{}, {}, ResetPasswordDTO>,
  res: Response,
  next: NextFunction,
) {
  const { password, code } = req.body;

  jwt.verify(code, CONFIG.jwtSecret, async (err, decoded) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Code is not valid" });
      }

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Code is expired" });
      }

      return next(err);
    }

    const email = (decoded as ResetPasswordPayload).email;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
    } catch (error) {
      console.error(error);
    } finally {
      res.json({ message: "Password changed successfully" });
    }
  });
}
