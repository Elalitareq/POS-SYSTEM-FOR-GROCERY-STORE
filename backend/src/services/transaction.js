import transactionDAL from '../dal/transactionDAL.js';

const listAllTransactions = async () => await transactionDAL.getAllTransactions();

const findTransactionById = async (id) => await transactionDAL.getTransactionById(id);

const createNewTransaction = async (transactionData) => await transactionDAL.createTransaction(transactionData);

const modifyTransaction = async (id, transactionData) => await transactionDAL.updateTransaction(id, transactionData);

const removeTransaction = async (id) => await transactionDAL.deleteTransaction(id);

export default {
  listAllTransactions,
  findTransactionById,
  createNewTransaction,
  modifyTransaction,
  removeTransaction,
};
