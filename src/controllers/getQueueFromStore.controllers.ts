import { Request, Response } from "express";
import { connect } from "../database";

export function getQueueFromStore (req: Request, res: Response){

    const connection = connect();

    const store_id = req.params.store_id

    console.log(store_id);

    //this is the data that is going to be sent to the website.
    connection.query(`SELECT * FROM queues WHERE store=${store_id}`, (err:any, result:any) => {
        return res.status(201).send(result);
    });


}