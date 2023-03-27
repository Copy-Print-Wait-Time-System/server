import { Request, Response } from "express";
import { connect } from "../../database";

export function employeeVerification(req: Request, res: Response){

    const connection = connect();
    const bcrypt = require('bcrypt');
    const store_id = parseInt(req.params.store_id)

    connection.query(`select hashedPW from storePasswords where store = ${store_id};`, (err:any, dbPW:any) => {
        if (err) {
            console.error(err);
            return res.status(400).send("Error loggin in.");
        }

        //Check if Store # exists in DB. Without this check the server can crash if attemptint to login to nonexistant store.
        if (dbPW[0] == null){
            return res.status(201).send(`There is no store # ${store_id} in the database.`)
        }

        var json = JSON.parse(JSON.stringify(dbPW[0]));
        var storePW = json["hashedPW"];

        bcrypt.compare(req.body.password, storePW).then((result: any) => {
            console.log(result)
            return res.status(201).send(result);
        });
    });

}