import Express from "express";
import { tryCatch } from "../utils/functions.js";
import {
    addCategory,
    getAllCategory,
    getCategoryById,
    editCategory,
    removeCategory,
} from "../controllers/category.js";

const router = Express.Router();

router.post("/create-category", tryCatch(addCategory));
router.post("/modify-category/:id", tryCatch(editCategory));

router.get("/categories", tryCatch(getAllCategory));
router.get("/category/:id", tryCatch(getCategoryById));
router.delete("/remove-category/:id", tryCatch(removeCategory));

export default router;
