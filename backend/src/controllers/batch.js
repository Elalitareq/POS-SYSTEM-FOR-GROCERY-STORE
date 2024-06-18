import batchService from '../services/batch.js';
import { makeError } from '../utils/functions.js';

export async function addBatch(req, res) {
  const data = req.body;
  const newBatch = await batchService.createNewBatch(data);
  if (newBatch) {
    res.status(201).json({
      message: 'batch created succesfuly',
      newBatch: newBatch,
    });
  } else {
    makeError('failed to create', 400);
  }
}

export async function editBatch(req, res) {
  const data = req.body;
  const { id } = req.params;
  const modifyBatch = await batchService.modifyBatch(id, data);
  if (modifyBatch) {
    res.status(201).json({
      message: 'batch modified succesfuly',
      modifyBatch: modifyBatch,
    });
  } else {
    makeError('failed to modify', 400);
  }
}

export async function getAllBatch(_, res) {
  const allBatches = await batchService.listAllBatches();
  if (allBatches) {
    res.status(201).json(allBatches);
  } else {
    makeError('failed to get categories', 400);
  }
}

export async function getBatchById(req, res) {
  const { id } = req.params;
  const batchById = await batchService.findBatchById(id);
  if (batchById) {
    res.status(201).json(batchById);
  } else {
    makeError('failed to get batch', 400);
  }
}

export async function removeBatch(req, res) {
  const { id } = req.params;
  const removeBatch = await batchService.removeBatch(id);
  if (removeBatch) {
    res.status(201).json(removeBatch);
  } else {
    makeError('failed to remove batch', 400);
  }
}
