import prisma from "../utils/prisma.js";

async function getAllBatches() {
    return await prisma.batch.findMany();
}

async function getBatchById(id) {
    return await prisma.batch.findUnique({
        where: { id },
    });
}

async function createBatch(data) {
    return await prisma.batch.create({
        data,
    });
}

async function updateBatch(id, data) {
    return await prisma.batch.update({
        where: { id },
        data,
    });
}

async function deleteBatch(id) {
    return await prisma.batch.delete({
        where: { id },
    });
}

const batchDAL = {
    getAllBatches,
    getBatchById,
    createBatch,
    updateBatch,
    deleteBatch,
};

export default batchDAL;
