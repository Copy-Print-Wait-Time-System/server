import { Request, Response } from "express";
import { connect } from "../../database";

export function moveUpCustomer (req: Request, res: Response){

    const connection = connect();

    const store_id = req.params.store_id
    
    const userID = req.body.user_id;
    const currentPosition = req.body.position;

    console.log(store_id, userID, currentPosition);

    if (currentPosition - 1 == 0) {
        return res.status(201).send('Customer already on top of the queue');
    }

    //this is the data that is going to be sent to the website.
    connection.query(`SELECT userID FROM queues WHERE store = ${store_id} AND position = ${currentPosition -1};`, (err:any, sql_response:any) => {
        var json = JSON.parse(JSON.stringify(sql_response[0]));
        var idUpCustomer = parseInt(json["userID"])

        console.log('customer id up: ' + idUpCustomer)

        console.log(userID, idUpCustomer)
        connection.query(`UPDATE queues SET position = position - 1 WHERE userID = ${userID};
        UPDATE queues SET position = position + 1 WHERE userID = ${idUpCustomer};`, (err:any, customerPosition:any) => {

            return res.status(201).send('Customer moved up the queue successfully');
        })

    });


}