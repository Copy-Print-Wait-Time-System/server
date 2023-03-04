import { Request, Response } from "express";
import { connect } from "../database";
import { zipcodeFilter } from "../functions/zipcode-filter";

export function employeeVerification(req: Request, res: Response){

    const connection = connect();

    //this is the data that is going to be sent to the website.
    connection.query(``, (err:any, result:any) => {

        
        
        return res.status(201).send(result);
    });


}