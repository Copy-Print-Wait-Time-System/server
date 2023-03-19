"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const getQueueFromStore_controllers_1 = require("../controllers/queue/getQueueFromStore.controllers");
const moveUpCustomer_controller_1 = require("../controllers/queue/moveUpCustomer.controller");
router.route('/:store_id').get(getQueueFromStore_controllers_1.getQueueFromStore).put(moveUpCustomer_controller_1.moveUpCustomer);
exports.default = router;
