"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const getQueueFromStore_controllers_1 = require("../controllers/getQueueFromStore.controllers");
router.route('/:store_id').get(getQueueFromStore_controllers_1.getQueueFromStore);
exports.default = router;
