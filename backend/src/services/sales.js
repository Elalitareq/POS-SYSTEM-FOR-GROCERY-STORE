import { SaleType } from "@prisma/client";
import productDAL from "../dal/product.js";
import transactionDAL from "../dal/transaction.js";
import transactionDetailDAL from "../dal/transactionDetail.js";
import { asyncForEach } from "../utils/functions.js";

async function createBill(bill) {
  // [
  //   {
  //     id: 9,
  //     name: 'test',
  //     description: 'test',
  //     sku: '314513431',
  //     categoryID: 1,
  //     inventoryCount: 20,
  //     soldCount: 0,
  //     regularPrice: 4,
  //     salePrice: 10,
  //     wholesalePrice: 9,
  //     costPrice: 5,
  //     lastModified: '2024-06-23T12:45:19.212Z',
  //     userId: 1,
  //     categoryId: 1,
  //     batches: [ [Object] ],
  //     Category: {
  //       id: 1,
  //       name: 'test',
  //       description: 'test',
  //       lastModified: '2024-06-22T21:12:40.670Z'
  //     },
  //     totalProductCount: 10,
  //     quantity: 3
  //   },
  // ]

  bill.forEach(async (product) => {
    await productDAL.incrementOrDecrementProductSoldCount(
      product.id,
      product.quantity
    );
  });

  const totalAmount = bill.reduce((acc, product) => {
    return acc + product.regularPrice * product.quantity;
  }, 0);

  console.log(totalAmount);

  const transaction = await transactionDAL.createTransaction({
    totalAmount,
    saleType: SaleType.REGULAR,
  });

  await asyncForEach(bill, (product) => {
    transactionDetailDAL.createTransactionDetail({
      transactionId: transaction.id,
      productId: product.id,
      quantity: product.quantity,
      priceAtTimeOfSale: product.regularPrice,
    });
  });
  return transaction;
}

async function getBillById(id) {
  const bill = await transactionDAL.getTransactionById(id);
  return bill;
}

async function getAllBills() {
  const bills = await transactionDAL.getAllTransactions();
  return bills;
}

const saleServices = { createBill, getBillById, getAllBills };

export default saleServices;
