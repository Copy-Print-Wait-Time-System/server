import {createPool} from 'mysql2';
require('dotenv').config();

export function connect(){

    const connection = createPool({
        connectionLimit : 10,
        host: process.env.URL,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: 'officedepot'
      })

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
