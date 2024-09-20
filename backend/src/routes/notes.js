import { Router } from "express";
import deleteNote from "../controllers/notesControllers/deleteNote.js";
import getAllNotes from "../controllers/notesControllers/getAllNotes.js";
import getNote from "../controllers/notesControllers/getNote.js";
import newNote from "../controllers/notesControllers/newNote.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const router = Router();
router.post("/new", protectedRoute, newNote);
router.delete("/:id", protectedRoute, deleteNote);
router.get("/all", protectedRoute, getAllNotes);
router.get("/:id", protectedRoute, getNote);

export default router;
