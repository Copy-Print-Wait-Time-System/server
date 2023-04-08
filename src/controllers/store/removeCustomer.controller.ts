import { Request, Response } from "express";
import { connect } from "../../database";

export function removeCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body
    const store_id = req.params.store_id

    const userPosition = data.Position
    const user_ID = data.userID

    console.log(data)

    // This query checks that the userID exists in the queue table.
    connection.query(`select userID from queues where userID = ${user_ID};`, (err:any, dbUserID:any) => {

        //Check if queue is empty
        if (dbUserID[0] == null){
            return res.status(201).send(`There is no user in position ${userPosition} at store ${store_id}.`)
        }

        //This query uses the userID to remove the user from the queue
        connection.query(`Delete from queues where userID = ${user_ID};`, (err:any, result:any) => {

            // This query updates the positions of all users behind the removed user
            connection.query(`Update queues set position = position - 1 where store = ${store_id} and position > ${userPosition};`, (err:any, result:any) => {
            return res.status(201).send(`Customer with ID ${user_ID} successfully deleted from the queue in store #${store_id}.`)
            })
        })
    });
}