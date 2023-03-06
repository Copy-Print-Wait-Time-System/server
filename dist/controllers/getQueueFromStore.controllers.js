"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueueFromStore = void 0;
const database_1 = require("../database");
function getQueueFromStore(req, res) {
    const connection = (0, database_1.connect)();
    const store_id = req.params.store_id;
    console.log(store_id);
    //this is the data that is going to be sent to the website.
    connection.query(`SELECT * FROM queues WHERE store=${store_id}`, (err, result) => {
        return res.status(201).send(result);
    });
}
exports.getQueueFromStore = getQueueFromStore;
