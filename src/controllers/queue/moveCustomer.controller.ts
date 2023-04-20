import { Request, Response } from "express";
import { connect } from "../../database";
import { moveCustomerUpdateWaitTime } from "../../functions/moveCustomerUpdateWaitTime";

export function moveCustomer (req: Request, res: Response){
    const connection = connect();

    const store_id = req.params.store_id
    const userID = req.body.userID;
    const up_or_down = req.body.up_or_down;

    //Check if the user is already on top of the queue
    if(up_or_down != "up" && up_or_down != "down"){
        return res.status(400).send('Up or down not given');
    }

    const currentPosition = req.body.position;
    const switchPosition = (up_or_down == 'up' ? currentPosition - 1 : currentPosition + 1)

    //prevents accidentally moving a customer up the queue when the user is already at the front.
    if (switchPosition == 0) {
        return res.status(400).send('Customer already on top of the queue');
    }

    //this is the data that is going to be sent to the website.
    connection.query(`SELECT userID FROM queues WHERE store = ${store_id} AND position = ${switchPosition};
    SELECT count(*) from queues WHERE store = ${store_id};`, (err:any, sql_response:any) => {
        var max_position = parseInt(sql_response[1][0]["count(*)"])
        
        //check that the customer in the queue is not the last one.
        if(switchPosition > max_position){
            return res.status(400).send('Customer last in the queue');
        } 
        
        var idSwitchCustomer = parseInt(sql_response[0][0]["userID"])

        connection.query(`UPDATE queues SET position = ${switchPosition}, estimatedWaitTime = (SELECT sum(customerTime) FROM queues WHERE store = ${store_id} AND position < ${switchPosition})
        WHERE userID = ${userID};
        UPDATE queues SET position = ${currentPosition}, estimatedWaitTime = (SELECT sum(customerTime) FROM queues WHERE store = ${store_id} AND position < ${currentPosition})
        WHERE userID = ${idSwitchCustomer};`, (err:any, customerPosition:any) => {

            moveCustomerUpdateWaitTime(store_id, switchPosition, max_position)

            return res.status(201).send(up_or_down == 'up' ? 'Customer moved up the queue successfully' : 'Customer moved down the queue successfully');
        })

    });


}
