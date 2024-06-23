import productDAL from "../dal/product.js";

const listAllProducts = async () => {
  const listProductsTemp = await productDAL.getAllProducts();
  const productList = listProductsTemp.map((product) => {
    let totalProductCount = 0;
    product?.batches?.forEach((batch) => {
      totalProductCount += batch.quantity;
    });
    return { ...product, totalProductCount };
  });
  return productList;
};

const findProductById = async (id) => productDAL.getProductById(id);

async function createNewProduct(productData) {
  return productDAL.createProduct(productData);
}

async function modifyProduct(id, productData) {
  return productDAL.updateProduct(id, productData);
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
