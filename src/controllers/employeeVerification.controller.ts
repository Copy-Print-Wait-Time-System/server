import { Request, Response } from "express";
import { connect } from "../database";

export function employeeVerification(req: Request, res: Response){

    const connection = connect();

    const data = req.body;

    const store_id = req.params.store_id

    console.log(data);

    //this is the data that is going to be sent to the website.
    connection.query(`SELECT password FROM passwords WHERE store = ${store_id}`, (err:any, result:any) => {

        
        return res.status(201).send(result);
    });


}