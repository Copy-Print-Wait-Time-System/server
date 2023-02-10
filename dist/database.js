"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mysql_1 = require("mysql");
function connect() {
    const connection = (0, mysql_1.createPool)({
        connectionLimit: 10,
        host: '127.0.0.1',
        user: 'root',
        password: '2727',
        database: 'officedepot'
    });
    return connection;
}
exports.connect = connect;
