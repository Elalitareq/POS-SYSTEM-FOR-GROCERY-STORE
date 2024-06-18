import transactionDAL from '../dal/transactionDAL.js';

const listAllTransactions = async () => {
  return await transactionDAL.getAllTransactions();
};

const findTransactionById = async id => {
  return await transactionDAL.getTransactionById(id);
};

const createNewTransaction = async transactionData => {
  return await transactionDAL.createTransaction(transactionData);
};

const modifyTransaction = async (id, transactionData) => {
  return await transactionDAL.updateTransaction(id, transactionData);
};

const removeTransaction = async id => {
  return await transactionDAL.deleteTransaction(id);
};

export default {
  listAllTransactions,
  findTransactionById,
  createNewTransaction,
  modifyTransaction,
  removeTransaction,
};
