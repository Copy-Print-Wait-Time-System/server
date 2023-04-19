import { Request, Response } from "express";
import { connect } from "../../database";
import { updateStoreWaitTime } from "../../functions/updateStoreWaitTime";

export function removeCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body;
    const store_id = req.params.store_id;

    const userPosition = data.position;
    const user_ID = data.userID;
    const estimatedWaitTime = data.estimatedWaitTime;

    

    //This query uses the userID to remove the user from the queue
   
        // query updates the positions of all users behind the removed user
        connection.query(`UPDATE queues SET estimatedWaitTime = estimatedWaitTime - ${estimatedWaitTime} WHERE store = ${store_id} AND position > ${userPosition};UPDATE queues SET position = position - 1 WHERE store = ${store_id} AND position > ${userPosition};DELETE FROM queues WHERE userID = ${user_ID};`, async (err:any, result:any) => {
            await updateStoreWaitTime(store_id).then();
            
            connection.end()

            return res.status(201).send(`Customer with ID ${user_ID} successfully deleted from the queue in store #${store_id}.`)
        })

}