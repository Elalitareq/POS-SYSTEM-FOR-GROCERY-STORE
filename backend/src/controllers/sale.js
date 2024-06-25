import saleServices from "../services/sales.js";
import actionService from "../services/action.js";
import { getArrayOfObjectAddInArabicAndEnglish } from "../utils/userAtions.js";

export async function addBill(req, res) {
  const bill = req.body;
  if (bill) {
    const mappingBill = bill.map((eachProduct) => {
      return {
        name: eachProduct.name,
        sku: eachProduct.sku,
        regularPrice: eachProduct.regularPrice,
        totalAmount: eachProduct.totalAmount,
        quantity: eachProduct.quantity,
      };
    });
    const actionDescription =
      getArrayOfObjectAddInArabicAndEnglish(mappingBill);

    console.log(actionDescription);
    await actionService.createNewAction(
      req.user.id,
      actionDescription.ar,
      actionDescription.en,
      "CREATE",
      `فاتورة`
    );
    const transaction = await saleServices.createBill(bill);
    res.status(200).json({ message: "bill created succ", transaction });
  }
}

export async function getTransactionById(req, res) {
  const { id } = req.params;
  console.log(id);
  const transaction = await saleServices.getBillById(id);
  return res.send(transaction);
}

export async function getAllTransactions(req, res) {
  const transactions = await saleServices.getAllBills();

  return res.send(transactions);
}
