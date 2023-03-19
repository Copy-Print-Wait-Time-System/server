"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveUpCustomer = void 0;
const database_1 = require("../../database");
function moveUpCustomer(req, res) {
    const connection = (0, database_1.connect)();
    const store_id = req.params.store_id;
    const userID = req.body.user_id;
    const currentPosition = req.body.position;
    if (currentPosition - 1 == 0) {
        return res.status(201).send('Customer already on top of the queue');
    }
    //this is the data that is going to be sent to the website.
    connection.query(`SELECT userID FROM queues WHERE store = ${store_id} AND position = ${currentPosition - 1};`, (err, idUpCustomer) => {
        connection.query(`UPDATE queues SET position = position - 1 WHERE userID = ${userID};
        UPDATE queues SET position = position + 1 WHERE userID = ${idUpCustomer};`, (err, customerPosition) => {
            return res.status(201).send('Customer moved up the queue successfully');
        });
    });
}
exports.moveUpCustomer = moveUpCustomer;
