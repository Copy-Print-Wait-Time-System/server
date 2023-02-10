"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const getStore_controllers_1 = require("../controllers/getStore.controllers");
const addCustomer_controllers_1 = require("../controllers/addCustomer.controllers");
const removeCustomer_controller_1 = require("../controllers/removeCustomer.controller");
const editCustomer_controller_1 = require("../controllers/editCustomer.controller");
router.route('/:store_id').get(getStore_controllers_1.getStore).post(addCustomer_controllers_1.addCustomer).delete(removeCustomer_controller_1.removeCustomer).put(editCustomer_controller_1.editCustomer);
exports.default = router;