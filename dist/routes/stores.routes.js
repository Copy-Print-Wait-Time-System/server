"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const stores_controllers_1 = require("../controllers/stores.controllers");
router.route('/:zip_code').get(stores_controllers_1.stores);
exports.default = router;
