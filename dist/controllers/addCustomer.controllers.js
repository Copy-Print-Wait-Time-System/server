"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCustomer = void 0;
const database_1 = require("../database");
function addCustomer(req, res) {
    const connection = (0, database_1.connect)();
    const data = req.body;
    const store_id = req.params.store_id;
    const userName = data.name;
    //estTime will eventually be calculated with a Wait-Time algorithm
    const estTime = 5;
    console.log(data);
    //First query gets the number of people in the stores queue
    connection.query(`select max(position) from storeQueues where store = ${store_id};`, (err, dbPosition) => {
        //Check if queue is empty
        if (dbPosition == null) {
            dbPosition = 0;
        }
        //Set position for new user in Queue
        const position = dbPosition + 1;
        //Pass data to the store queue
        connection.query(`insert into storequeues (userName, position, estimatedTime, store) values (${userName}, ${position}, ${estTime}, ${store_id})`, (err, result) => {
            return res.status(201).send("Customer added successfully to store #" + store_id);
        });
    });
}
exports.addCustomer = addCustomer;
