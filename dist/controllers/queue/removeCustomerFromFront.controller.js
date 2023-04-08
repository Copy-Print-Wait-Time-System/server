"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCustomerFromFront = void 0;
const database_1 = require("../../database");
function removeCustomerFromFront(req, res) {
    const connection = (0, database_1.connect)();
    const store_id = req.params.store_id;
    const userID = req.body.user_id;
    connection.query(`DELETE FROM queues WHERE position = 1 AND store = ${store_id}; 
    UPDATE queues SET position = position - 1 WHERE store = ${store_id} and position > 1;`, (err, sql_response) => {
        return res.status(201).send('Customer in front removed from queue');
    });
}
exports.removeCustomerFromFront = removeCustomerFromFront;
