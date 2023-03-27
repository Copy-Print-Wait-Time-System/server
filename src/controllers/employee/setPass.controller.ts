import { Request, Response } from "express";
import { connect } from "../../database";

export function setPass(req: Request, res: Response){

    const store_id = parseInt(req.params.store_id)
    const bcrypt = require('bcrypt');
    const saltRounds = 13;

    const connection = connect();
    
        bcrypt.hash(req.body.password, saltRounds).then((hash: any) => {

            connection.query(`insert into storePasswords (store, hashedPW) values (${store_id}, "${hash}")`, (err:any, result:any) => {
                if (err) {
                    console.error(err);
                    return res.status(400).send("Error setting password.");
                }
    
                return res.status(201).send(`Password set for store ${store_id}`);
            });
        });
    
    }