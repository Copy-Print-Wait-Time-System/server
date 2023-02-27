import { Request, Response } from "express";
import { connect } from "../database";

export function editCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body
    const store_id = req.params.store_id
    const userID = req.body.userID

    console.log(data)

    
    connection.query(`Select * from queues where userID = ${userID};`, (err:any, result:any) => {

        
        //Check if queue is empty
        if (result[0] == null){
            return res.status(201).send(`There is no user with ID ${userID}.`)
        }

        //dbPosition comes back as a JSON, this code gets the value as a string
        var json = JSON.parse(JSON.stringify(result[0]));
        var userID = json["userID"]

        


        return res.status(201).send("Customer successfully edited from the queue in store #" + store_id)
    })

}