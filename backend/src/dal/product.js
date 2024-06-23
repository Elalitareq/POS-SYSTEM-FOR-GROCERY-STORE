import prisma from "../utils/prisma.js";

async function getAllProducts() {
  return prisma.product.findMany({
    include: {
      batches: true,
      Category: true,
    },
  });
}

async function getProductById(id) {
  const productId = parseInt(id);
  return prisma.product.findUnique({
    where: { id: productId },
    include: {
      batches: true,
      Category: true,
    },
  });
}

async function createProduct(data) {
  return prisma.product.create({
    data,
  });
}

async function updateProduct(id, data) {
  const productId = parseInt(id);
  return prisma.product.update({
    where: { id: productId },
    data,
  });
}

async function incrementOrDecrementProductCount(productId, change) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  await prisma.product.update({
    where: { id: productId },
    data: {
      inventoryCount: product.inventoryCount + change,
    },
  });
}

async function deleteProduct(id) {
  const productId = parseInt(id);
  return prisma.product.delete({
    where: { id: productId },
  });
}

const productDAL = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  incrementOrDecrementProductCount,
};

export default productDAL;
