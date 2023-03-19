"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCustomer = void 0;
const database_1 = require("../../database");
function removeCustomer(req, res) {
    const connection = (0, database_1.connect)();
    const data = req.body;
    const store_id = req.params.store_id;
    const userPosition = req.body.Position;
    console.log(data);
    // This query gets the unique userID of the user we want to remove from the queue. The employee must know the position of the user they wish to remove.
    connection.query(`select userID from queues where store = ${store_id} and position = ${userPosition};`, (err, dbUserID) => {
        //Check if queue is empty
        if (dbUserID[0] == null) {
            return res.status(201).send(`There is no user in position ${userPosition} at store ${store_id}.`);
        }
        //dbPosition comes back as a JSON, this code gets the value as a string
        var json = JSON.parse(JSON.stringify(dbUserID[0]));
        var userID = json["userID"];
        //This query uses the retrieved userID to remove the user from the queue
        connection.query(`Delete from queues where userID = ${userID};`, (err, result) => {
            // This query updates the positions of all users behind the removed user
            connection.query(`Update queues set position = position - 1 where store = ${store_id} and position > ${userPosition};`, (err, result) => {
                return res.status(201).send(`Customer with ID ${userID} successfully deleted from the queue in store #${store_id}.`);
            });
        });
    });
}
exports.removeCustomer = removeCustomer;
