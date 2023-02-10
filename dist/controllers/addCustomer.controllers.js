"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCustomer = void 0;
const database_1 = require("../database");
function addCustomer(req, res) {
    const connection = (0, database_1.connect)();
    const data = req.body;
    const store_id = req.params.store_id;
    console.log(data);
    return res.status(201).send("Customer added successfully to store #" + store_id);
}
exports.addCustomer = addCustomer;
