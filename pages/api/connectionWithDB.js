import {createConnection} from 'mysql2';

const {DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE}=process.env

export function ConnectionWithDB(){
    return createConnection({
        host:DB_HOST,
        user:DB_USER,
        password:DB_PASSWORD,
        database:DB_DATABASE,
    });
}