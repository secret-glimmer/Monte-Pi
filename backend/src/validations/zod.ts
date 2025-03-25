import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Input validation error",
          errors: err.errors.map((e) => ({ path: e.path, message: e.message })),
        });
      }
      next(err);
    }
  };
