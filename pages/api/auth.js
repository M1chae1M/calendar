import {verifiKey} from './verifiKey';
import {myPromise} from './promiseF';

export const JWT=require('jsonwebtoken');

module.exports=(req, res)=>{
    const {body}=req;
    const {token}=body;

    const verification=JWT.decode(token, verifiKey);
    if (verification!==null){
        const query=`SELECT * from ${process.env.DB_ALERTS_TABLE} WHERE ${process.env.DB_ALERTS_TABLE}.user="${verification.login}"`;
        myPromise(query)
        .then(data=>res.status(200).json(verification ? {logged:true, message:'', alerts:data[0]} : {logged:false, message:''}));
    }
    else res.status(200).json({logged: false, message: ''});
}