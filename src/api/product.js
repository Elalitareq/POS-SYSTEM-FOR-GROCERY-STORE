// Example Express route using the product DAL
import productDAL from "../dal/product.js";
import Express from "express";

const router = Express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await productDAL.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

export default router;
