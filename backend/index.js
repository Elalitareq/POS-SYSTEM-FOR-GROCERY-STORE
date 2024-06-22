import express from "express";
import cors from "cors";
import productRoutes from "./src/api/product.js";
import userRoutes from "./src/api/user.js";
import categoryRoutes from "./src/api/category.js";
import errorHandler from "./src/middleware/errorHandler.js";
import batchRoutes from "./src/api/batch.js";

const app = express();

// app = something;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/printers", batchRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// (async () => {
//     const batches = await batchService.listAllBatches();
//     console.log(batches);
// })();
