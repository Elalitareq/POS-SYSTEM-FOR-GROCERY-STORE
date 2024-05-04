// Example Express route using the product DAL
import Express from "express";
import { tryCatch } from "../utils/functions.js";
import {
    addProduct,
    getAllProducts,
    getProductById,
    editProduct,
} from "../controllers/product.js";

const router = Express.Router();

// router.get("/products", async (req, res) => {
//     try {
//         const products = await productDAL.getAllProducts();
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching products" });
//     }
// });
router.post("/create-product", tryCatch(addProduct));
router.post("/modify-product/:id", tryCatch(editProduct));

router.get("/products", tryCatch(getAllProducts));
router.get("/products/:id", tryCatch(getProductById));

export default router;
