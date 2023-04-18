import { Request, Response } from "express";
import { connect } from "../../database";
import { calculateEstTime } from "../../functions/calculateEstTime";
import { updateStoreWaitTime } from "../../functions/updateStoreWaitTime";
import { calculateTotalWaitTime } from "../../functions/calculateTotalWaitTime";

export function addCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body
    const store_id = req.params.store_id

    const customerTime = calculateEstTime(data);
  
    //First query gets the number of people in the stores queue
    connection.query(`SELECT max(position) FROM queues WHERE store = ${store_id};`, async (err:any, dbPosition:any) => {

        var estimatedWaitTime;

        if (dbPosition == undefined){
            position = 0
        }
        else{
            //dbPosition comes back as a JSON, this code gets the value as a string
            var json = JSON.parse(JSON.stringify(dbPosition[0]));
            var position = json["max(position)"]
        }
        //Check if queue is empty
        if (position == null){
            position = 0
        }
        
        //Set position for new user in Queue
        position = parseInt(position) + 1

        if(position == 1){
            estimatedWaitTime = 0;
        }
        else{
            estimatedWaitTime = await calculateTotalWaitTime(position, store_id)
        }

        //Pass data to the store queue
        connection.query(`INSERT INTO queues (firstName, lastName, position, estimatedWaitTime, store, customerTime)
                        VALUES ("${data.fname}", "${data.lname}",${position}, ${estimatedWaitTime}, ${store_id}, ${customerTime})`, (err:any, result:any) => {
            if (err) {
                console.error(err);
                return res.status(400).send("Error with adding customer");
            }

            //get userID for this new customer.
            connection.query(`SELECT userID FROM queues WHERE store = ${store_id} AND firstName = "${data.fname}" AND lastName = "${data.lname}" AND customerTime = "${customerTime}";`, (err:any, userIDNumber:any) => {
                if (err) {
                    console.error(err);
                    return res.status(400).send("Error with adding customer");
                }

                //userID comes back as a JSON, this code gets the value as a string
                var json = JSON.parse(JSON.stringify(userIDNumber[0]));
                var userID = json["userID"]

                //Pass required job information and optional job information to database.
                connection.query(`insert into customerJobs (userID, job, copies, numPages, paperSize, paperType, fitPaper, color, sides, orientation, jobCollate)
                values (${userID}, "${data.job}", ${data.copies}, "${data.numPages}", "${data.paperSize}", "${data.paperType}", "${data.fitPaper}", "${data.color}", "${data.sides}", "${data.orientation}", "${data.collate}"); 
                INSERT INTO customerJobsOptional (userID, stapling, cutting, folding, holePunching, waferSealColor, waferSealSides, perforation, lamination, shrinkWrap, addFoamBoardMounting, removePages, slipsheet, trimToEdge, specialInstructions)
                VALUES (${userID}, "${data.stapling}", "${data.cutting}", "${data.folding}", "${data.holePunching}", "${data.waferSealColor}", "${data.waferSealSides}", "${data.perforation}", "${data.lamination}", "${data.shrinkWrap}", "${data.addFoamBoardMounting}", "${data.removePages}", "${data.slipsheet}", "${data.trimToEdge}", "${data.specialInstructions}");`, (err:any, result:any) => {

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