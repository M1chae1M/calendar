import {verifiKey} from './verifiKey';
import {myPromise} from './promiseF';
import {ConnectionWithDB} from "./connectionWithDB";

export const mysql=require('mysql2');
export const jwt=require('jsonwebtoken');

module.exports=(req, res)=>{
    const {body}=req;
    const {login, password}=body;
    const query=`SELECT profile.login from profile WHERE profile.login="${login}" AND profile.password=SHA2('${password}', 256)`;
    const queryForAlerts=`SELECT * from alerts WHERE alerts.user="${login}"`;
    const verifiToken=jwt.sign({login, password}, verifiKey);

    myPromise(query)
    .then((data)=>{
        if(data.length>0){
            myPromise(queryForAlerts)
            .then(alrt=>res.status(200).json({token:verifiToken, logged:true, message:'', alerts:alrt[0]}))
        }
        else{
            res.status(200).json({message:'Login failed!!!', logged:false})
        }
    })
}