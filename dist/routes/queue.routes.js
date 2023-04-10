"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const getQueueFromStore_controllers_1 = require("../controllers/queue/getQueueFromStore.controllers");
const moveCustomer_controller_1 = require("../controllers/queue/moveCustomer.controller");
const removeCustomerFromFront_controller_1 = require("../controllers/queue/removeCustomerFromFront.controller");
router.route('/:store_id').get(getQueueFromStore_controllers_1.getQueueFromStore).put(moveCustomer_controller_1.moveCustomer).delete(removeCustomerFromFront_controller_1.removeCustomerFromFront);
exports.default = router;
