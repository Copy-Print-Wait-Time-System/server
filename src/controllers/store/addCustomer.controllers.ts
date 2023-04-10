import { Request, Response } from "express";
import { connect } from "../../database";
import { calculateEstTime } from "../../functions/calculateEstTime";
import { updateStoreWaitTime } from "../../functions/updateStoreWaitTime";

export function addCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body
    const store_id = req.params.store_id

    const estTime = calculateEstTime(data);

    console.log(data)

    
    //First query gets the number of people in the stores queue
    connection.query(`select max(position) from queues where store = ${store_id};`, (err:any, dbPosition:any) => {
        

        if (dbPosition == undefined){
            position = 0
        }
        else{
            //dbPosition comes back as a JSON, this code gets the value as a string
        var json = JSON.parse(JSON.stringify(dbPosition[0]));
        var position = json["max(position)"]

        //Check if queue is empty
        if (position == null){
            position = 0
        }
        }
        //Set position for new user in Queue
        position = parseInt(position) + 1

        //Pass data to the store queue
        connection.query(`insert into queues (firstName, lastName, position, estimatedTime, store)
                        values ("${data.fname}", "${data.lname}",${position}, ${estTime}, ${store_id})`, (err:any, result:any) => {
            if (err) {
                console.error(err);
                return res.status(400).send("Error with adding customer");
            }

            //get userID for this new customer.
            connection.query(`select userID from queues where store = ${store_id} and firstName = "${data.fname}" and lastName = "${data.lname}" and estimatedTime = "${estTime}";`, (err:any, userIDNumber:any) => {
                if (err) {
                    console.error(err);
                    return res.status(400).send("Error with adding customer");
                }

                //userID comes back as a JSON, this code gets the value as a string
                var json = JSON.parse(JSON.stringify(userIDNumber[0]));
                var userID = json["userID"]

                //Pass required job information to database.
                connection.query(`insert into customerJobs (userID, job, copies, numPages, paperSize, paperType, fitPaper, color, sides, orientation, jobCollate)
                values (${userID}, "${data.job}", ${data.copies}, "${data.numPages}", "${data.paperSize}", "${data.paperType}", "${data.fitPaper}", "${data.color}", "${data.sides}", "${data.orientation}", "${data.collate}");`, (err:any, result:any) => {

                    if (err) {
                        console.error(err);
                        return res.status(400).send("Error with adding customer");
                    }
                });

                //Pass optional job information to database.
                connection.query(`insert into customerJobsOptional (userID, stapling, cutting, folding, holePunching, waferSealColor, waferSealSides, perforation, lamination, shrinkWrap, addFoamBoardMounting, removePages, slipsheet, trimToEdge, specialInstructions)
                values (${userID}, "${data.stapling}", "${data.cutting}", "${data.folding}", "${data.holePunching}", "${data.waferSealColor}", "${data.waferSealSides}", "${data.perforation}", "${data.lamination}", "${data.shrinkWrap}", "${data.addFoamBoardMounting}", "${data.removePages}", "${data.slipsheet}", "${data.trimToEdge}", "${data.specialInstructions}");`, (err:any, result:any) => {
                    if (err) {
                        console.error(err);
                        return res.status(400).send("Error with adding customer");
                    }
                });

            });

            
            updateStoreWaitTime(store_id);
            
            return res.status(201).send("Customer added successfully to store #" + store_id)
        });


    });

}