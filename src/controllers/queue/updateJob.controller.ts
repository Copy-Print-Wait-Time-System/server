import { Request, Response } from "express";
import { connect } from "../../database";

export function updateJob (req: Request, res: Response){

    const connection = connect();
    const data = req.body;
    const store_id = req.params.store_id


    // Updates all the fields for a user in the Queue table
    connection.query(``, (err:any, result:any) => {
        if (err){
            console.error(err);
            return res.status(400).send("Error updating values.");
        }
        

        return res.status(201).send(result);
    });


}