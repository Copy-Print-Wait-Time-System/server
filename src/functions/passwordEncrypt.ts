import { connect } from "../database";

const bcrypt = require('bcrypt');
const saltRounds = 13;

export function encrypt(store: number, password: string) : string {

    const connection = connect();

    return bcrypt.hash(password, saltRounds).then((hash: any) => {
        console.log(hash)

        connection.query(`insert into storePasswords (store, hashedPW) values (${store}, "${hash}")`, (err:any, result:any) => {
            if (err) {
                console.error(err);
                return "Error with password";
            }

            return result;
        });
    });

}

export function authenticate(storeID: number, password: string): any {

    const connection = connect();

    connection.query(`select hashedPW from storePasswords where store = ${storeID};`, (err:any, dbPW:any) => {
        var json = JSON.parse(JSON.stringify(dbPW[0]));
        var storePW = json["hashedPW"];

        bcrypt.compare(password, storePW).then((result: any) => {
            console.log(result)
            return result.status(201).send(result);
        });
    });

}
