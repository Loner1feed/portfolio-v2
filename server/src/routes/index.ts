import { Router } from "express";
import itemsRouter from './items.routes';
import usersRouter from './users.routes';

const router = Router();

// mount routes here 👇
router.use('/items', itemsRouter);
router.use('/auth', usersRouter);

export default router;