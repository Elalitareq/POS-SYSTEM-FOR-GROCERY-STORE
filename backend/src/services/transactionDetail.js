import transactionDetailDAL from '../dal/transactionDetailDAL.js';

const listAllTransactionDetails = async () => await transactionDetailDAL.getAllTransactionDetails();

const findTransactionDetailById = async (id) => await transactionDetailDAL.getTransactionDetailById(id);

const createNewTransactionDetail = async (transactionDetailData) => await transactionDetailDAL.createTransactionDetail(
  transactionDetailData,
);

const modifyTransactionDetail = async (id, transactionDetailData) => await transactionDetailDAL.updateTransactionDetail(
  id,
  transactionDetailData,
);

const removeTransactionDetail = async (id) => await transactionDetailDAL.deleteTransactionDetail(id);

export default {
  listAllTransactionDetails,
  findTransactionDetailById,
  createNewTransactionDetail,
  modifyTransactionDetail,
  removeTransactionDetail,
};
