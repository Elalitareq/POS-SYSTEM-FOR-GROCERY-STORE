import batchDAL from "../dal/batch.js";

async function createBill(bill) {
    let i;
    for (i = 0; i < bill.length; i++) {
        const findProduct = await batchDAL.getBatchByProductId(bill[i].id);
        const restQuantity = findProduct.quantity - bill[i].quantity;
        if (restQuantity <= 0) {
            return;
        } else {
            //here i have to update onthe productId the quantity 
            //but which expire date i have to update on 
            console.log(findProduct);
            console.log(restQuantity);
            batchDAL.updateBatch(bill[i].id, {
                ...findProduct,
                quantity: restQuantity,
            });
        }
    }
}

export { createBill };
