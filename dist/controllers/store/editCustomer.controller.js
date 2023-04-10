"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCustomer = void 0;
const database_1 = require("../../database");
function editCustomer(req, res) {
    const connection = (0, database_1.connect)();
    const data = req.body;
    const store_id = req.params.store_id;
    const userID = data.userID;
    const first_name = data.first_name;
    const last_name = data.last_name;
    const estimatedTime = data.estimatedTime;
    console.log(store_id);
    // This will update the values for a specific user in the Queue
    connection.query(`Update queues set firstName = "${first_name}", lastName = "${last_name}", estimatedTime = "${estimatedTime}" where userID = "${userID}";`, (err, result) => {
        return res.status(201).send(result);
    });
}
exports.editCustomer = editCustomer;
