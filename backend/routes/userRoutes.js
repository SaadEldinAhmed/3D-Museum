// backend/routes/userRoutes.js
import express from 'express';
import { getAll, createNew, updateUser, loginUser, resetPassword } from '../controllers/userController.js';

const router = express.Router();

router.get('/read', getAll);
router.post('/login', loginUser);
router.post('/reset', resetPassword);


router.post('/add', createNew);
router.put('/:id', updateUser);

export default router;
