import batchDAL from "../dal/batch.js";
import productDAL from "../dal/product.js";

const listAllBatches = async () => await batchDAL.getAllBatches();

const findBatchById = async (id) => await batchDAL.getBatchById(id);

const createNewBatch = async (batchData) => {
  const { productId } = batchData;
  if (!productId) {
    throw new Error("Product ID is required to create a batch");
  }

  await productDAL.incrementOrDecrementProductCount(
    productId,
    batchData.quantity
  );

  return batchDAL.createBatch(batchData);
};

const createMultipleBatches = async (productId, batche) => {
  if (batche && batche.length > 0) {
    // Add each batch linked to the newly created product ID
    const batches = await Promise.all(
      batche.map((batch) =>
        batchService.createNewBatch({ ...batch, productId })
      )
    );
    return batches;
  }
};

const modifyBatch = async (id, batchData) =>
  batchDAL.updateBatch(id, batchData);

const removeBatch = async (id) => batchDAL.deleteBatch(id);

const batchService = {
  listAllBatches,
  findBatchById,
  createNewBatch,
  modifyBatch,
  removeBatch,
  createMultipleBatches,
};

export default batchService;
