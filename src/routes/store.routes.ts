import { Router } from 'express'
const router = Router();

import { getStore } from '../controllers/getStore.controllers'
import { addCustomer } from '../controllers/addCustomer.controllers';
import { removeCustomer } from '../controllers/removeCustomer.controller';
import { editCustomer } from '../controllers/editCustomer.controller';

router.route('/:store_id').get(getStore).post(addCustomer).delete(removeCustomer).put(editCustomer)

export default router;