import { Router } from 'express'
const router = Router();

import { getQueueFromStore } from '../controllers/queue/getQueueFromStore.controllers'
import { moveCustomer } from '../controllers/queue/moveCustomer.controller';
import { removeCustomerFromFront } from '../controllers/queue/removeCustomerFromFront.controller';
import { updateJob } from '../controllers/queue/updateJob.controller';

router.route('/:store_id').get(getQueueFromStore).put(moveCustomer).delete(removeCustomerFromFront).post(updateJob)

export default router;