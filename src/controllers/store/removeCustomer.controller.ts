import { Request, Response } from "express";
import { connect } from "../../database";
import { updateStoreWaitTime } from "../../functions/updateStoreWaitTime";

export function removeCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body;
    const store_id = req.params.store_id;

    const userPosition = data.position;
    const user_ID = data.userID

    console.log(data)

    //This query uses the userID to remove the user from the queue
    connection.query(`
    
    UPDATE queues
    SET estimatedWaitTime = estimatedWaitTime - (SELECT estimatedWaitTime FROM queues WHERE store = ${store_id} AND userID = ${user_ID})
    WHERE store = 4 AND position > ${userPosition};` , (err:any, result:any) => {

        // query updates the positions of all users behind the removed user
        connection.query(`UPDATE queues SET position = position - 1 WHERE store = ${store_id} AND position > ${userPosition};DELETE FROM queues WHERE userID = ${user_ID};`, (err:any, result:any) => {
            updateStoreWaitTime(store_id)

            return res.status(201).send(`Customer with ID ${user_ID} successfully deleted from the queue in store #${store_id}.`)
        })
    })
}