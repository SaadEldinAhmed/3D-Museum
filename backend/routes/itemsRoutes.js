// routes/itemRoutes.js
import express from 'express';
import { getItems, addItems } from '../controllers/itemController.js';

const router = express.Router();

router.get('/items', getItems);
router.post('/items/reviews', addItems);

export default router;
