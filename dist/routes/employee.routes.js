"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const employeeVerification_controller_1 = require("../controllers/employee/employeeVerification.controller");
const setPass_controller_1 = require("../controllers/employee/setPass.controller");
router.route('/:store_id').post(employeeVerification_controller_1.employeeVerification).put(setPass_controller_1.setPass);
exports.default = router;
