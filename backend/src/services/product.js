import productDAL from "../dal/product.js";

async function listAllProducts() {
  return await productDAL.getAllProducts();
}

async function findProductById(id) {
  return await productDAL.getProductById(id);
}

async function createNewProduct(productData) {
  return await productDAL.createProduct(productData);
}

async function modifyProduct(id, productData) {
  return await productDAL.updateProduct(id, productData);
}

async function removeProduct(id) {
  return await productDAL.deleteProduct(id);
}

export default {
  listAllProducts,
  findProductById,
  createNewProduct,
  modifyProduct,
  removeProduct,
};
