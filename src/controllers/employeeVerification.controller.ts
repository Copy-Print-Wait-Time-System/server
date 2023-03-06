import { Request, Response } from "express";
import { connect } from "../database";

export function employeeVerification(req: Request, res: Response){

    const connection = connect();

    const pass = req.body.password;

    const store_id = req.params.store_id


    //this is the data that is going to be sent to the website.
    connection.query(`SELECT password FROM passwords WHERE store = ${store_id}`, (err:any, result:any) => {
        const db_pass = result[0].password;

        return res.status(201).send(db_pass === pass);
    });


}