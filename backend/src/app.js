import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import notesRouter from "./routes/notes.js";
import userRouter from "./routes/user.js";
config();

export const app = express();
app.use(
  cors({
    origin: [
      "https://notex-ramim.vercel.app",
      "https://note-x-git-main-raaaaaaamims-projects.vercel.app",
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"], // Allow custom headers
    preflightContinue: false,
  })
);


app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);

// Error handler
app.use(errorHandler);
