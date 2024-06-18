import transactionDetailDAL from '../dal/transactionDetailDAL.js';

const listAllTransactionDetails = async () => {
  return await transactionDetailDAL.getAllTransactionDetails();
};

const findTransactionDetailById = async id => {
  return await transactionDetailDAL.getTransactionDetailById(id);
};

const createNewTransactionDetail = async transactionDetailData => {
  return await transactionDetailDAL.createTransactionDetail(
    transactionDetailData
  );
};

const modifyTransactionDetail = async (id, transactionDetailData) => {
  return await transactionDetailDAL.updateTransactionDetail(
    id,
    transactionDetailData
  );
};

const removeTransactionDetail = async id => {
  return await transactionDetailDAL.deleteTransactionDetail(id);
};

export default {
  listAllTransactionDetails,
  findTransactionDetailById,
  createNewTransactionDetail,
  modifyTransactionDetail,
  removeTransactionDetail,
};
