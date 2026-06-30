import { Request, Response, NextFunction } from "express";
import Logger from "../lib/logger";

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  Logger.error(
    `${req.method} ${req.originalUrl}`,
    error
  );

  const status =
    error?.statusCode ||
    error?.status ||
    500;

  const message =
    error?.message ||
    "Internal Server Error";

  return res.status(status).json({
    success: false,
    status,
    message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    ...(process.env.NODE_ENV !== "production" && {
      stack: error?.stack
    })
  });
}