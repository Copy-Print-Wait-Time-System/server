import { Router } from 'express'
const router = Router();

import { employeeVerification } from '../controllers/employee/employeeVerification.controller'

router.route('/:store_id').get(employeeVerification)

export default router;