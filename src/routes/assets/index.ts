import { Router } from 'express';

import getFileFromPath from './getFileFromPath';

const router = Router()

router.get('/*path', getFileFromPath)

export default router
