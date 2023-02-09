import { Router } from 'express'
const router = Router();

import { stores } from '../controllers/stores.controllers'

router.route('/:zip_code').get(stores)

export default router;