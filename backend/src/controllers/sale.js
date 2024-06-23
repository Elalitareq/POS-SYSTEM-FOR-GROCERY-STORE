import saleServices from "../services/sales.js";

export async function addBill(req, res) {
  const bill = req.body;
  if (bill) {
    await saleServices.createBill(bill);
  }
  res.status(200).json({ message: "bill created succ" });
}
