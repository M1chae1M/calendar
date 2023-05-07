import {createConnection} from 'mysql2';

export function ConnectionWithDB(){
    return createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE,
    });
}