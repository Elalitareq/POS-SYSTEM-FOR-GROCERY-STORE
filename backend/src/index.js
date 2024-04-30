import express from "express";
import productRoutes from "./api/product.js";
import userRoutes from "./api/user.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();

// app = something;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
