import Express from "express";
import { addBill } from "../controllers/sale.js";
import { tryCatch } from "../utils/functions.js";

const router = Express.Router();

router.post("/create-bill", tryCatch(addBill));

export default router;
