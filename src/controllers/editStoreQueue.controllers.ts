import { Request, Response } from "express";
import { connect } from "../database";

export function editStoreQueue (req: Request, res: Response){

    const connection = connect();

    const store_id = req.params.store_id
    const userID = req.body.userID
    const userName = req.body.userName
    const estimatedTime = req.body.estimatedTime

    console.log(store_id);

    // This will update the values for a specific user in the Queue
    connection.query(`Update queues set userName = "${userName}", estimatedTime = "${estimatedTime}" where userID = "${userID}";`, (err:any, result:any) => {

        //Check if userID exists
        if (result[0] == null){
            return res.status(201).send(`There is no user with ID ${userID} in the queue.`)
        }

        return res.status(201).send(result);
    });

}