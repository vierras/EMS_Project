import { Router } from 'express';
import userRoute from './userRoute';

const router = Router()

router.use('/users', userRoute);
router.use('/events', userRoute);

export default router;