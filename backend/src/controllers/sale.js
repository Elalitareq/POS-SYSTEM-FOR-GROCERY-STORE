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

        await saleServices.createBill(bill);
    }
    res.status(200).json({ message: "bill created succ" });
}
