"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCustomer = void 0;
const database_1 = require("../../database");
const calculateEstTime_1 = require("../../functions/calculateEstTime");
const updateStoreWaitTime_1 = require("../../functions/updateStoreWaitTime");
function addCustomer(req, res) {
    const connection = (0, database_1.connect)();
    const data = req.body;
    const store_id = req.params.store_id;
    //estTime will eventually be calculated with a Wait-Time algorithm
    const estTime = (0, calculateEstTime_1.calculateEstTime)(data);
    console.log(data);
    //First query gets the number of people in the stores queue
    connection.query(`select max(position) from queues where store = ${store_id};`, (err, dbPosition) => {
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
        connection.query(`insert into queues (firstName, lastName, position, estimatedTime, store) values ("${data.fname}", "${data.lname}",${position}, ${estTime}, ${store_id})`, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).send("Error with adding customer");
            }
            //get userID for this new customer.
            connection.query(`select userID from queues where store = ${store_id} and firstName = "${data.fname}" and lastName = "${data.lname}" and estimatedTime = "${estTime}";`, (err, userIDNumber) => {
                if (err) {
                    console.error(err);
                    return res.status(400).send("Error with adding customer");
                }
                //userID comes back as a JSON, this code gets the value as a string
                var json = JSON.parse(JSON.stringify(userIDNumber[0]));
                var userID = json["userID"];
                //Pass required job information to database.
                connection.query(`insert into customerJobs (userID, job, quantity, paperSize, paperType, fitPaper, color, sides, orientation, jobCollate)
                values (${userID}, "${data.job}", ${data.quantity}, "${data.paperSize}", "${data.paperType}", "${data.fitPaper}", "${data.color}", "${data.sides}", "${data.orientation}", "${data.collate}");`, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(400).send("Error with adding customer");
                    }
                });
                //Pass optional job information to database.
                connection.query(`insert into customerJobsOptional (userID, stapling, cutting, folding, holePunching, waferSealColor, waferSealSides, perforation, lamination, shrinkWrap, addFoamBoardMounting, removePages, slipsheet, trimToEdge, specialInstructions)
                values (${userID}, "${data.stapling}", "${data.cutting}", "${data.folding}", "${data.holePunching}", "${data.waferSealColor}", "${data.waferSealSides}", "${data.perforation}", "${data.lamination}", "${data.shrinkWrap}", "${data.addFoamBoardMounting}", "${data.removePages}", "${data.slipsheet}", "${data.trimToEdge}", "${data.specialInstructions}");`, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(400).send("Error with adding customer");
                    }
                });
            });
            (0, updateStoreWaitTime_1.updateStoreWaitTime)(store_id);
            return res.status(201).send("Customer added successfully to store #" + store_id);
        });
    });
}
exports.addCustomer = addCustomer;
