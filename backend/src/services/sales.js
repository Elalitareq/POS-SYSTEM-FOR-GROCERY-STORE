import batchDAL from "../dal/batch.js";

async function createBill(bill) {
    let i;
    for (i = 0; i < bill.length; i++) {
        const findProduct = await batchDAL.getBatchByProductId(bill[i].id);
        console.log(findProduct);
        const restQuantity = findProduct.quantity - bill[i].quantity;
        console.log(restQuantity);
        batchDAL.updateBatch(bill[i].id, {
            ...findProduct,
            quantity: restQuantity,
        });
    }
}

export { createBill };
