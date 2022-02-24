import express from 'express';

import { getStocks, getStock, getStocksBySearch, createStock, updateStock, deleteStock } from '../controllers/stocks.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getStocksBySearch);
router.get('/', getStocks);
router.get('/:id', getStock);

router.post('/', auth,  createStock);
router.patch('/:id', auth, updateStock);
router.delete('/:id', auth, deleteStock);


export default router;