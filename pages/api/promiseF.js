import {ConnectionWithDB} from "./connectionWithDB";

export function myPromise(query){
    const connection=ConnectionWithDB();
    return new Promise((resolve, reject)=>{
        connection.query(query, (error, results, fields)=>{
        error && reject(error);
        resolve(results);
        });
    })
}