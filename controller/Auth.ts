import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.ACCESS_TOKEN_SECRET as string;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send({
        message: "Access denied",
      });
    }

    const verify = jwt.verify(token, secret);
    req.userData = verify;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
