import prisma from "../utils/prisma";

async function getAllProducts() {
  return await prisma.product.findMany();
}

async function getProductById(id) {
  return await prisma.product.findUnique({
    where: { id },
  });
}

async function createProduct(data) {
  return await prisma.product.create({
    data,
  });
}

async function updateProduct(id, data) {
  return await prisma.product.update({
    where: { id },
    data,
  });
}

async function deleteProduct(id) {
  return await prisma.product.delete({
    where: { id },
  });
}

const productDAL = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productDAL;
