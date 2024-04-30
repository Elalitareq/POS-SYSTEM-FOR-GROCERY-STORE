import prisma from "../utils/prisma";

async function getAllCategories() {
  return await prisma.category.findMany();
}

async function getCategoryById(id) {
  return await prisma.category.findUnique({
    where: { id },
  });
}

async function createCategory(data) {
  return await prisma.category.create({
    data,
  });
}

async function updateCategory(id, data) {
  return await prisma.category.update({
    where: { id },
    data,
  });
}

async function deleteCategory(id) {
  return await prisma.category.delete({
    where: { id },
  });
}

const categoryDAL = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryDAL;
