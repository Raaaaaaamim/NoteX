import cookieParser from "cookie-parser";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import notesRouter from "./routes/notes.js";
import userRouter from "./routes/user.js";
export const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);

// Error handler
app.use(errorHandler);
