import { logger } from "../utils/logger";
import { Request, Response, NextFunction } from "express";

export const PointsController = {
  async generatePoints(req: Request, res: Response, next: NextFunction) {
    try {
      const { numberOfPoints } = req.body;

      const points = Array.from({ length: numberOfPoints }, () => ({
        x: Math.random(),
        y: Math.random(),
      }));
      logger.info(`Generated ${points.length} points`);
      res.json({
        points,
      });
    } catch (error) {
      logger.error(`Error generating points: ${error}`);
      next(error);
    }
  },
};
