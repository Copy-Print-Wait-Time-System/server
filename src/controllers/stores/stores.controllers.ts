import { Request, Response } from "express";
import { connect } from "../../database";
import { zipcodeFilter } from "../../functions/zipcode-filter";

export function stores (req: Request, res: Response){

    const connection = connect();

    var zip_code = req.params.zip_code

    const zipcodesArray = zipcodeFilter(zip_code, 50)

    //this is the data that is going to be sent to the website.
    connection.query(`SELECT * FROM stores WHERE zip IN (?)`, [zipcodesArray], (err:any, result:any) => {
        return res.status(201).send(result);
    });


}