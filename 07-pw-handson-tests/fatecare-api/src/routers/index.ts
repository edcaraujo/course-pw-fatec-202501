import express from 'express';
import PatientRouter from "./patient.router"
import { apiKeyAuthMiddleware, baiscAuthMiddleware, jwtAuthMiddleware } from '../middlewares/auth.middleware';
import userRouter from './user.router';
import authRouter from './auth.router';

const router = express.Router();

router.use('/login', authRouter);
router.use('/patients', jwtAuthMiddleware, PatientRouter);
router.use('/users', userRouter);

export default router;