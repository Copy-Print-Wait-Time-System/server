"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mysql2_1 = require("mysql2");
require('dotenv').config();
function connect() {
    const connection = (0, mysql2_1.createPool)({
        connectionLimit: 10,
        host: process.env.URL,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: 'officedepot'
    });
    connection.getConnection((err, connection) => {
        if (err) {
            console.error(`Error connecting to database: ${err.stack}`);
            return;
        }
        console.log(`Successfully connected to database as ID ${connection.threadId}`);
        connection.release();
    });
    return connection;
}
exports.connect = connect;
