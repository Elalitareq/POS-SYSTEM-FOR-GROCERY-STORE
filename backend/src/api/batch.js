import Express from 'express';
import { tryCatch } from '../utils/functions.js';
import {
  addBatch,
  getAllBatch,
  getBatchById,
  editBatch,
  removeBatch,
} from '../controllers/batch.js';

const router = Express.Router();

router.post('/create-batch', tryCatch(addBatch));
router.post('/modify-batch/:id', tryCatch(editBatch));

router.get('/batches', tryCatch(getAllBatch));
router.get('/batch/:id', tryCatch(getBatchById));
router.delete('/remove-batch/:id', tryCatch(removeBatch));

export default router;
