import express, { NextFunction, Request, Response } from "express";
const cors = require("cors");
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, How are you doing today?");
});

// 404 error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found. ",
  });
});

// Start the server
const PORT = process.env.PORT || 2026;
app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
