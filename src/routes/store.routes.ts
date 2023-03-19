import { Router } from 'express'
const router = Router();

import { getStore } from '../controllers/store/getStore.controllers'
import { addCustomer } from '../controllers/store/addCustomer.controllers';
import { removeCustomer } from '../controllers/store/removeCustomer.controller';
import { editCustomer } from '../controllers/store/editCustomer.controller';

router.route('/:store_id').get(getStore).post(addCustomer).delete(removeCustomer).put(editCustomer)

export default router;