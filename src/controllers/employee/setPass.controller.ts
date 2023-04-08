import { Request, Response } from "express";
import { connect } from "../../database";

export function setPass(req: Request, res: Response){

    const store_id = parseInt(req.params.store_id)
    const bcrypt = require('bcrypt');
    //saltRounds are more-or-less the strength level of the encryption. Higher = stronger.
    //Values set too low will not be very secure and values set too high will take a long
    //time to encrypt. Set to 13 for a good balance.
    const saltRounds = 13;

    const connection = connect();
    
        //Using bcrypt, salt and hash the entered password.
        bcrypt.hash(req.body.password, saltRounds).then((hash: any) => {

            //Pass the encrypted password to the database.
            connection.query(`insert into storePasswords (store, hashedPW) values (${store_id}, "${hash}")`, (err:any, result:any) => {
                if (err) {
                    //Possible errors include:
                    //Trying to set a password for a store that already has a password set.
                    //Attempting to set a password for a store that does not exist in the stores table.
                    console.error(err);
                    return res.status(400).send("Error setting password.");
                }
    
                return res.status(201).send(`Password set for store ${store_id}`);
            });
        });
    
    }