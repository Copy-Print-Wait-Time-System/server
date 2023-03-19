import { Router } from 'express'
const router = Router();

import { getQueueFromStore } from '../controllers/queue/getQueueFromStore.controllers'
import { moveUpCustomer } from '../controllers/queue/moveUpCustomer.controller';

router.route('/:store_id').get(getQueueFromStore).put(moveUpCustomer)

export default router;