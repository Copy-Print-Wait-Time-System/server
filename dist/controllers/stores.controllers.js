"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stores = void 0;
const database_1 = require("../database");
function stores(req, res) {
    const connection = (0, database_1.connect)();
    var zip_code = req.params.zip_code;
    console.log(zip_code);
    //this is the data that is going to be sent to the website.
    connection.query(`SELECT * FROM stores WHERE zip=${zip_code}`, (err, result) => {
        return res.status(201).send(result);
    });
}
exports.stores = stores;
