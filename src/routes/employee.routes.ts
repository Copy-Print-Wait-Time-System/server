import { Router } from 'express'
const router = Router();

import { employeeVerification } from '../controllers/employeeVerification.controller'

router.route('/:store_id').get(employeeVerification)

export default router;