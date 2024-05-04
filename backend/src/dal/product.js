import prisma from "../utils/prisma.js";

async function getAllProducts() {
    return await prisma.product.findMany({
        include: {
            Category: true,
        },
    });
}

async function getProductById(id) {
    const productId = parseInt(id);
    return await prisma.product.findUnique({
        where: { id: productId },
        include: {
            Category: true,
        },
    });
}

async function createProduct(data) {
    return await prisma.product.create({
        data,
    });
}

async function updateProduct(id, data) {
    const productId = parseInt(id);
    return await prisma.product.update({
        where: { id: productId },
        data,
    });
}

async function deleteProduct(id) {
    const productId = parseInt(id);
    return await prisma.product.delete({
        where: { id: productId },
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
