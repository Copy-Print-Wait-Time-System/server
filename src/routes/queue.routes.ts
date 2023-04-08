import { Router } from 'express'
const router = Router();

import { getQueueFromStore } from '../controllers/queue/getQueueFromStore.controllers'
import { moveCustomer } from '../controllers/queue/moveCustomer.controller';
import { removeCustomerFromFront } from '../controllers/queue/removeCustomerFromFront.controller';

router.route('/:store_id').get(getQueueFromStore).put(moveCustomer).delete(removeCustomerFromFront)

export default router;