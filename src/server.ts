import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import reminderRoutes from "./routes/reminderRoutes";
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, How are you doing today?");
});
// tick endpoint
app.get("/tick", (req: Request, res: Response) => {
  // receive tick from telex
  res.json({ success: true, message: "Tick received" });
});
// webhook endpoint
app.post("/webhook", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ success: true, message: "Webhook received" });
});
// reminder routes
app.use('/',reminderRoutes);
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
