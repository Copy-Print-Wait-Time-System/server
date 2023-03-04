"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCustomer = void 0;
const database_1 = require("../database");
const calculateEstTime_1 = require("../functions/calculateEstTime");
const updateStoreWaitTime_1 = require("../functions/updateStoreWaitTime");
function addCustomer(req, res) {
    const connection = (0, database_1.connect)();
    const data = req.body;
    const store_id = req.params.store_id;
    const userName = data.name;
    const jobs = data.jobs;
    const job_type = data.job_type;
    //estTime will eventually be calculated with a Wait-Time algorithm
    const estTime = (0, calculateEstTime_1.calculateEstTime)(jobs, job_type);
    console.log(data);
    //First query gets the number of people in the stores queue
    connection.query(`select max(position) from storeQueues where store = ${store_id};`, (err, dbPosition) => {
        //dbPosition comes back as a JSON, this code gets the value as a string
        var json = JSON.parse(JSON.stringify(dbPosition[0]));
        var position = json["max(position)"];
        //Check if queue is empty
        if (position == null) {
            position = 0;
        }
        //Set position for new user in Queue
        position = parseInt(position) + 1;
        //Pass data to the store queue
        connection.query(`insert into storequeues (userName, position, estimatedTime, store) values ("${userName}", ${position}, ${estTime}, ${store_id})`, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).send("Error with adding customer");
            }
            (0, updateStoreWaitTime_1.updateStoreWaitTime)(store_id);
            return res.status(201).send("Customer added successfully to store #" + store_id);
        });
    });
}
exports.addCustomer = addCustomer;
