import { Router } from 'express'
const router = Router();

import { store } from '../controllers/store.controllers'

router.route('/:store_id').get(store)

export default router;