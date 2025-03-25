import express, { Request, Response } from "express";
import cors from "cors";
import { validate } from "./validations/zod";
import { generatePointsSchema } from "./validations/points";
import { PointsController } from "./controllers/points";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ message: "OK" });
});

app.post(
  "/points",
  validate(generatePointsSchema),
  PointsController.generatePoints
);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
