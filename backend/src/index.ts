import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ message: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
