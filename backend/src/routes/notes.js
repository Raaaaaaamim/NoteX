import { Router } from "express";
import deleteGroup from "../controllers/notesControllers/deleteGroup.js";
import deleteMultipleNotes from "../controllers/notesControllers/deleteMultipleNotes.js";
import deleteNote from "../controllers/notesControllers/deleteNote.js";
import getAllGroups from "../controllers/notesControllers/getAllGroups.js";
import getAllNotes from "../controllers/notesControllers/getAllNotes.js";
import getGroupNotes from "../controllers/notesControllers/getGroupNotes.js";
import getNote from "../controllers/notesControllers/getNote.js";
import newNote from "../controllers/notesControllers/newNote.js";
import searchNotes from "../controllers/notesControllers/searchNotes.js";
import protectedRoute from "../middlewares/protectedRoute.js";
const router = Router();
router.post("/new", protectedRoute, newNote);
router.post("/delete-many", protectedRoute, deleteMultipleNotes);

router.delete("/:id", protectedRoute, deleteNote);
router.get("/all", protectedRoute, getAllNotes);
router.get("/search/:query", protectedRoute, searchNotes);

router.get("/groups/all", protectedRoute, getAllGroups);
router.delete("/groups/:group", protectedRoute, deleteGroup);

router.post("/groups/:group", protectedRoute, getGroupNotes);

router.get("/:id", protectedRoute, getNote);

export default router;
