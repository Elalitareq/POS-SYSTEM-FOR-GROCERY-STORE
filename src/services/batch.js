import batchDAL from "../dal/batchDAL.js";

const listAllBatches = async () => {
  return await batchDAL.getAllBatches();
};

const findBatchById = async (id) => {
  return await batchDAL.getBatchById(id);
};

const createNewBatch = async (batchData) => {
  return await batchDAL.createBatch(batchData);
};

const createMultipleBatches = async (productId, batches) => {
  if (batches && batches.length > 0) {
    // Add each batch linked to the newly created product ID
    const batches = await Promise.all(
      batches.map((batch) => batchService.addBatch({ ...batch, productId }))
    );
  }
};

const modifyBatch = async (id, batchData) => {
  return batchDAL.updateBatch(id, batchData);
};

const removeBatch = async (id) => {
  return batchDAL.deleteBatch(id);
};

const batchService = {
  listAllBatches,
  findBatchById,
  createNewBatch,
  modifyBatch,
  removeBatch,
  createMultipleBatches,
};

export default batchService;
