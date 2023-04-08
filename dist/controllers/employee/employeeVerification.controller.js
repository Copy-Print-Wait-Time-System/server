"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeVerification = void 0;
const database_1 = require("../../database");
function employeeVerification(req, res) {
    const connection = (0, database_1.connect)();
    const pass = req.body.password;
    const store_id = req.params.store_id;
    //this is the data that is going to be sent to the website.
    connection.query(`SELECT password FROM passwords WHERE store = ${store_id}`, (err, result) => {
        const db_pass = result[0].password;
        return res.status(201).send(db_pass === pass);
    });
}
exports.employeeVerification = employeeVerification;
