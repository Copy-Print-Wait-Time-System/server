import { Request, Response } from "express";
import { connect } from "../../database";
import { calculateEstTime } from "../../functions/calculateEstTime";
import { updateStoreWaitTime } from "../../functions/updateStoreWaitTime";

export function addCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body
    const store_id = req.params.store_id

    const first_name = data.first_name;
    const last_name = data.last_name;
    const jobs = data.jobs;
    const job_type = data.job_type;

    //estTime will eventually be calculated with a Wait-Time algorithm
    const estTime = calculateEstTime(jobs, job_type, true);

    console.log(data)
    
    //First query gets the number of people in the stores queue
    connection.query(`select max(position) from queues where store = ${store_id};`, (err:any, dbPosition:any) => {
        
        //dbPosition comes back as a JSON, this code gets the value as a string
        var json = JSON.parse(JSON.stringify(dbPosition[0]));
        var position = json["max(position)"]

        //Check if queue is empty
        if (position == null){
            position = 0
        }

        //Set position for new user in Queue
        position = parseInt(position) + 1

        //Pass data to the store queue
        connection.query(`insert into queues (name, last_name, position, estimatedTime, store) values ("${first_name}", "${last_name}",${position}, ${estTime}, ${store_id})`, (err:any, result:any) => {
            if (err) {
                console.error(err);
                return res.status(400).send("Error with adding customer");
            }
            updateStoreWaitTime(store_id);

            return res.status(201).send("Customer added successfully to store #" + store_id)
        });


    });

}