import { Router } from "express";
import assetRouter from './assets';
import apiRouter from './api';

const router = Router();

router.use('/assets', assetRouter)
router.use('/api', apiRouter)

export default router
