import { Request, Response } from "express";
import { connect } from "../../database";

export function editCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body
    const store_id = req.params.store_id


    // This will return all the job information for the customer being edited.
    connection.query(`SELECT *
    FROM queues Q, customerJobs C, customerJobsOptional CO
    WHERE Q.userID = ${data.userID} AND Q.userID = C.userID AND Q.userID = CO.userID;`, (err:any, result:any) => {
        if (err) {
            console.error(err);
            return res.status(400).send("Error with getting customer details.");
        }
        return res.status(201).send(result);
    });

}