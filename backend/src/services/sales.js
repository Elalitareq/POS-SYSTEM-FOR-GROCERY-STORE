import productDAL from "../dal/product.js";
import transactionDAL from "../dal/transaction.js";

async function createBill(bill) {
  bill.forEach(async (product) => {
    await productDAL.incrementOrDecrementProductCount(
      product.id,
      -product.quantity
    );
  });

  return await transactionDAL.createTransaction({
    details: {
      create: bill,
    },
  });
}

const saleServices = { createBill };

export default saleServices;
