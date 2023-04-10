import { Request, Response } from "express";
import { connect } from "../../database";

export function getQueueFromStore (req: Request, res: Response){

    const connection = connect();

    const store_id = req.params.store_id


    // The data for all users in the queue needs to be sent to the website.
    connection.query(`SELECT *
    FROM queues Q, customerJobs C, customerJobsOptional CO
    WHERE Q.userID = C.userID AND Q.userID = CO.userID AND Q.store = ${store_id}
    ORDER BY Q.position;`, (err:any, result:any) => {
        if (err){
            console.error(err);
            return res.status(400).send("Error with getting Queue");
        }
        return res.status(201).send(result);
    });


}