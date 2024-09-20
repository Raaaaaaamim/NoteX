import { Router } from "express";
import createUser from "../controllers/userControllers/createUser.js";
import getUser from "../controllers/userControllers/getUser.js";
import loginUser from "../controllers/userControllers/loginUser.js";
import logoutUser from "../controllers/userControllers/logoutUser.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const router = Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);

router.get("/:id", protectedRoute, getUser);

export default router;
