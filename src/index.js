import express from "express";
import productRoutes from "./api/product.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 50000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
