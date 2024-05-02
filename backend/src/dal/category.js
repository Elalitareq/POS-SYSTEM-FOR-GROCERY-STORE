import prisma from "../utils/prisma.js";

async function getAllCategories() {
    return await prisma.category.findMany();
}

async function getCategoryById(id) {
    const categoryId = parseInt(id);
    return await prisma.category.findUnique({
        where: { id: categoryId },
    });
}

async function createCategory(data) {
    return await prisma.category.create({
        data,
    });
}

async function updateCategory(id, data) {
    const categoryId = parseInt(id);
    return await prisma.category.update({
        where: { id: categoryId },
        data,
    });
}

async function deleteCategory(id) {
    const categoryId = parseInt(id);
    return await prisma.category.delete({
        where: { id: categoryId },
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
