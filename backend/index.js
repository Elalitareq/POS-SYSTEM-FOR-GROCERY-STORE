import express from "express";
import cors from "cors";
import productRoutes from "./src/api/product.js";
import salesRoutes from "./src/api/sales.js";
import userRoutes from "./src/api/user.js";
import categoryRoutes from "./src/api/category.js";
import errorHandler from "./src/middleware/errorHandler.js";
import batchRoutes from "./src/api/batch.js";
import { verifyToken } from "./src/middleware/userPermission.js";
import actionsRoutes from "./src/api/action.js";

const app = express();

// app = something;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/products", verifyToken, productRoutes);
app.use("/api/categories", verifyToken, categoryRoutes);
app.use("/api/batches", verifyToken, batchRoutes);
app.use("/api/printers", verifyToken, batchRoutes);
app.use("/api/sales", verifyToken, salesRoutes);
app.use("/api/actions", verifyToken, actionsRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
