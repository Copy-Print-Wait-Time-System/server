import { Router } from 'express'
const router = Router();

import { getQueueFromStore } from '../controllers/getQueueFromStore.controllers'

router.route('/:store_id').get(getQueueFromStore)

export default router;