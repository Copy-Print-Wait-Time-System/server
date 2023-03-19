"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editStoreQueue = void 0;
const database_1 = require("../../database");
function editStoreQueue(req, res) {
    const connection = (0, database_1.connect)();
    const store_id = req.params.store_id;
    const userID = req.body.userID;
    const userName = req.body.userName;
    const estimatedTime = req.body.estimatedTime;
    console.log(store_id);
    // This will update the values for a specific user in the Queue
    connection.query(`Update queues set userName = "${userName}", estimatedTime = "${estimatedTime}" where userID = "${userID}";`, (err, result) => {
        //Check if userID exists
        if (result[0] == null) {
            return res.status(201).send(`There is no user with ID ${userID} in the queue.`);
        }
        return res.status(201).send(result);
    });
}
exports.editStoreQueue = editStoreQueue;
