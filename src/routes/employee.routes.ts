import { Router } from 'express'
const router = Router();

import { employeeVerification } from '../controllers/employee/employeeVerification.controller'
import { setPass } from '../controllers/employee/setPass.controller';

router.route('/:store_id').get(employeeVerification).put(setPass)

export default router;