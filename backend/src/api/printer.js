import Express from "express";

import { tryCatch } from "../utils/functions.js";

const router = Express.Router();

router.get("/", tryCatch());
router.post("/print", tryCatch());

export default router;
