import {verifiKey} from './verifiKey';
import {myPromise} from './promiseF';
import {ConnectionWithDB} from "./connectionWithDB";

export const JWT=require('jsonwebtoken');

module.exports=(req, res)=>{
    const {body}=req;
    const {token}=body;

    const verification=JWT.decode(token, verifiKey);
    if (verification!==null){
        const query=`SELECT * from ${process.env.DB_ALERTS_TABLE} WHERE ${process.env.DB_ALERTS_TABLE}.user="${verification.login}"`;
        myPromise(query)
        // const connection=ConnectionWithDB();
        // new Promise((resolve, reject) => {
        //     connection.query(query, (error, results, fields) => {
        //     error && reject(error);
        //     resolve(results);
        //     });
        // })
        .then(data=>res.status(200).json(verification ? {logged:true, message:'', alerts:data[0]} : {logged:false, message:''}));
    }
    else res.status(200).json({logged: false, message: ''});
}