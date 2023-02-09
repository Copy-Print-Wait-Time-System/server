import { Request, Response } from "express";
import { connect } from "../database";

export function stores (req: Request, res: Response){

    const connection = connect();

    var zip_code = req.params.zip_code

    console.log(zip_code);

    //this is the data that is going to be sent to the website.
    connection.query(`SELECT * FROM stores WHERE zip=${zip_code}`, (err:any, result:any) => {
        return res.status(201).send(result);
    });


}