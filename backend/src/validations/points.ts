import { z } from "zod";

export const generatePointsSchema = z.object({
  numberOfPoints: z.number().min(1).max(10000),
});
