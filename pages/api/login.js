import {verifiKey} from './verifiKey';
import {myPromise} from './promiseF';

export const mysql=require('mysql2');
export const jwt=require('jsonwebtoken');

module.exports=(req, res)=>{
    const {body}=req;
    const {login, password}=body;
    const query=`SELECT ${process.env.DB_PROFILE_TABLE}.login from ${process.env.DB_PROFILE_TABLE} WHERE ${process.env.DB_PROFILE_TABLE}.login="${login}" AND ${process.env.DB_PROFILE_TABLE}.password=SHA2('${password}', 256)`;
    const queryForAlerts=`SELECT * from ${process.env.DB_ALERTS_TABLE} WHERE ${process.env.DB_ALERTS_TABLE}.user="${login}"`;
    const verifiToken=jwt.sign({login, password}, verifiKey);

    myPromise(query)
    .then(data=>{
        Array.from(data).length>0?
            myPromise(queryForAlerts)
            .then(alrt=>res.status(200).json({token:verifiToken, logged:true, message:'', alerts:alrt[0]})):
                res.status(200).json({message:'Login failed!!!', logged:false})
    })
}