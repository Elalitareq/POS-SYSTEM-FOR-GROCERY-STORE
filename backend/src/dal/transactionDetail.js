import prisma from '../utils/prisma';

async function getAllTransactionDetails() {
  return await prisma.transactionDetail.findMany({
    include: { product: true, transaction: true }, // Include related product and transaction
  });
}

async function getTransactionDetailById(id) {
  return await prisma.transactionDetail.findUnique({
    where: { id },
    include: { product: true, transaction: true }, // Include related product and transaction
  });
}

async function createTransactionDetail(data) {
  return await prisma.transactionDetail.create({
    data,
  });
}

async function updateTransactionDetail(id, data) {
  return await prisma.transactionDetail.update({
    where: { id },
    data,
  });
}

async function deleteTransactionDetail(id) {
  return await prisma.transactionDetail.delete({
    where: { id },
  });
}

const transactionDetailDAL = {
  getAllTransactionDetails,
  getTransactionDetailById,
  createTransactionDetail,
  updateTransactionDetail,
  deleteTransactionDetail,
};

export default transactionDetailDAL;
