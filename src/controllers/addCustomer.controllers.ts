import { Request, Response } from "express";
import { connect } from "../database";

export function addCustomer (req: Request, res: Response){

    const connection = connect();
    const data = req.body
    const store_id = req.params.store_id

    console.log(data)

    return res.status(201).send("Customer added successfully to store #" + store_id)

}