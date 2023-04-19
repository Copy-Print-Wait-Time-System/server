import { Request, Response } from "express";
import { connect } from "../../database";
import { calculateEstTime } from "../../functions/calculateEstTime";
import { updateStoreWaitTime } from "../../functions/updateStoreWaitTime";
import { calculateTotalWaitTime } from "../../functions/calculateTotalWaitTime";
import { addJobInfo } from "../../functions/addJobInfo";

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
                        VALUES ("${data.fname}", "${data.lname}",${position}, ${estimatedWaitTime}, ${store_id}, ${customerTime})`, async (err:any, result:any) => {
            if (err) {
                console.error(err);
                return res.status(400).send("Error with adding customer");
            }

            //get userID for this new customer.
            connection.query(`SELECT userID FROM queues WHERE store = ${store_id} AND firstName = "${data.fname}" AND lastName = "${data.lname}" AND customerTime = "${customerTime}";`, async (err:any, userIDNumber:any) => {
                if (err) {
                    console.error(err);
                    return res.status(400).send("Error with adding customer");
                }

                //userID comes back as a JSON, this code gets the value as a string
                var json = JSON.parse(JSON.stringify(userIDNumber[0]));
                var userID = json["userID"]

                //Pass required job information and optional job information to database.
                const job_message = await addJobInfo(data, userID);

                if(job_message){
                    return res.status(400).send(job_message)
                }

            });

            updateStoreWaitTime(store_id).then((resp) =>{
                console.log(resp);
                connection.end();
            });
            
            return res.status(201).send("Customer added successfully to store #" + store_id)
        });

        

    });

}