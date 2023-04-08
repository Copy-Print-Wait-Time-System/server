"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const employeeVerification_controller_1 = require("../controllers/employee/employeeVerification.controller");
router.route('/:store_id').get(employeeVerification_controller_1.employeeVerification);
exports.default = router;
