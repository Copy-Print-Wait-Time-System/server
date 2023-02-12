import {createPool} from 'mysql';

export function connect(){

    const connection = createPool({
        connectionLimit : 10,
        host: 'localhost',
        user: 'root',
        password: '1408',
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
