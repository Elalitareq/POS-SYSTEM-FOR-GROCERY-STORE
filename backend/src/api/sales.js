import Express from "express";
import {
  addBill,
  getAllTransactions,
  getTransactionById,
} from "../controllers/sale.js";
import { tryCatch } from "../utils/functions.js";

const router = Express.Router();

router.post("/create-bill", tryCatch(addBill));
router.get("/transaction/:id", tryCatch(getTransactionById));
router.get("/transactions", tryCatch(getAllTransactions));

export default router;
