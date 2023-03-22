import { Request, Response } from "express";
import { connect } from "../../database";

export function editCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body
    const store_id = req.params.store_id

    const userID = data.userID
    const first_name = data.first_name;
    const last_name = data.last_name;
    const estimatedTime = data.estimatedTime

    console.log(store_id);

    // This will update the values for a specific user in the Queue
    connection.query(`Update queues set firstName = "${first_name}", lastName = "${last_name}", estimatedTime = "${estimatedTime}" where userID = "${userID}";`, (err:any, result:any) => {

        return res.status(201).send(result);
    });

}