import productService from "../services/productService.js";
import batchService from "../services/batchService.js"; // Assuming you have a separate batch service

// POST /products - Add a new product
export async function addProduct(req, res) {
  try {
    const { batches, productData } = req.body;

    const newProduct = await productService.addProduct(productData);

    const createdBatches = await createMultipleBatches(newProduct.id, batches);

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
      batches: createdBatches,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
}

// Other methods remain similar, handling only product-specific logic
