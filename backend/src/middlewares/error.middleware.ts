import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error("Error handling middleware", {
    error: error.message,
    stack: error.stack,
  });

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
};
