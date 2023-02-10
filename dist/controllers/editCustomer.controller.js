"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCustomer = void 0;
const database_1 = require("../database");
function editCustomer(req, res) {
    const connection = (0, database_1.connect)();
    const data = req.body;
    const store_id = req.params.store_id;
    console.log(data);
    return res.status(201).send("Customer successfully edited from the queue in store #" + store_id);
}
exports.editCustomer = editCustomer;
