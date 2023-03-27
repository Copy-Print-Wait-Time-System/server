import { connect } from "../database";

const bcrypt = require('bcrypt');
const saltRounds = 10;

export function encrypt(password: string) : string {

    return bcrypt.hash(password, saltRounds);

}

export function authenticate(storeID: number, password: string) : boolean {

    const connection = connect();
    
    var storePW = connection.query(`select hashedPW from storepasswords where store = ${storeID};`, (err:any, dbPW:any) => {
        var json = JSON.parse(JSON.stringify(dbPW[0]));
        var storePW = json["hashedPW"];

        return storePW;
    });

    return bcrypt.compare(password, storePW);

}
