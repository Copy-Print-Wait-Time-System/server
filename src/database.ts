import {createPool} from 'mysql2';
require('dotenv').config();

export function connect(){

    const connection = createPool({
        connectionLimit : 10,
        host: 'officedepot.ctoyac2wfwsj.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'group14ed2',
        database: 'officedepot',
        multipleStatements: true
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
