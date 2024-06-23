import Express from "express";
import actionController from "../controllers/action.js";
import { tryCatch } from "../utils/functions.js";

const router = Express.Router();

router.get("/actions", tryCatch(actionController.getAllAction));

export default router;
