import { Request, Response } from "express";
import { connect } from "../database";

export function addCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body
    const store_id = req.params.store_id

    const userName = data.Name
    //estTime will eventually be calculated with a Wait-Time algorithm
    const estTime = 5

    console.log(data)
    
    //First query gets the number of people in the stores queue
    connection.query(`select max(position) from storeQueues where store = ${store_id};`, (err:any, dbPosition:any) => {
        
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
        connection.query(`insert into storequeues (userName, position, estimatedTime, store) values ("${userName}", ${position}, ${estTime}, ${store_id})`, (err:any, result:any) => {
            return res.status(201).send("Customer added successfully to store #" + store_id)
        });
    });

}