import { Request, Response } from "express";
import { connect } from "../../database";

export function removeCustomerFromFront (req: Request, res: Response){
    const connection = connect();

    const store_id = req.params.store_id

    const userID = req.body.user_id;

    connection.query(`DELETE FROM queues WHERE position = 1 AND store = ${store_id}; 
    UPDATE queues SET position = position - 1 WHERE store = ${store_id} and position > 1;`, (err:any, sql_response:any) => {
        
        return res.status(201).send('Customer in front removed from queue')
    })

}