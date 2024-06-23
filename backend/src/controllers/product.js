import actionService from "../services/action.js";
import batchService from "../services/batch.js";
import productService from "../services/product.js";
import { getObjectChangesInArabicAndEnglish } from "../utils/userAtions.js";

// POST /products - Add a new product
export async function addProduct(req, res) {
  const { productData, batches } = req.body;

  const newProduct = await productService.createNewProduct(productData);

  if (batches) {
    await batchService.createMultipleBatches(newProduct.id, batches);
  }

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct,
  });
}

export async function editProduct(req, res) {
  const data = req.body;
  const { id } = req.params;
  const oldProduct = await productService.findProductById(id);
  const updatedProduct = await productService.modifyProduct(id, data);

  const actionDescription = getObjectChangesInArabicAndEnglish(
    oldProduct,
    updatedProduct
  );

  if (actionDescription.isChanged) {
    console.log(actionDescription);
    await actionService.createNewAction(
      req.user.id,
      actionDescription.ar,
      actionDescription.en,
      "UPDATE"
    );
  }

  res.status(201).json({
    message: "Product modify successfully",
    product: updatedProduct,
  });
}

export async function getAllProducts(_, res) {
  const productList = await productService.listAllProducts();

  res.status(201).json(productList);
}
export async function getProductById(req, res) {
  const { id } = req.params;
  const getProduct = await productService.findProductById(id);

  res.status(201).json(getProduct);
}

// Other methods remain similar, handling only product-specific logic
