import { Request, Response, NextFunction } from "express";

const requiredFields = [
  "store",
  "storefrontToken",
  "adminToken",
  "apiVersion",
];

export default function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const missing = requiredFields.filter(
    (field) =>
      req.body[field] === undefined ||
      req.body[field] === null ||
      req.body[field] === ""
  );

  if (missing.length) {
    return res.status(400).json({
      success: false,
      message: "Missing required configuration.",
      missing,
    });
  }

  next();
}