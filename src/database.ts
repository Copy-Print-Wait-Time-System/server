import {createPool} from 'mysql';

export function connect(){

    const connection = createPool({
        connectionLimit : 10,
        host: '127.0.0.1',
        user: 'root',
        password: '2727',
        database: 'officedepot'
      })

    return connection;
}
