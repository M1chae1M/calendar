import {verifiKey} from '../verifiKey';
import {myPromise} from '../promiseF';
import {ConnectionWithDB} from '../connectionWithDB';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import DB_instance from '../database';

export default async(req, res)=>{
    const {body}=req;
    const {login, password}=body;
    const query=`SELECT profile.login from profile WHERE profile.login="${login}" AND profile.password=SHA2('${password}', 256);`;
    // const queryForAlerts=`SELECT * from alerts WHERE alerts.user="${login}";`;

    const verifiToken=jwt.sign({login}, verifiKey);


    // await DB_instance.select('profile',['login'],{login,password})
    // await DB_instance.select('alerts','*',{user:login})

    myPromise(query)
    .then(async(data)=>{
      if(data?.length>0){
        const alrt=await DB_instance.select('alerts','*',{user:login})
        res.status(200).json({token:verifiToken, logged:true, message:'', alerts:alrt[0]})
        // myPromise(queryForAlerts)
        // .then((alrt)=>res.status(200).json({token:verifiToken, logged:true, message:'', alerts:alrt[0]}))
      }
      else{
        res.status(401).json({message:'Login failed!!!', logged:false})
      }
    })
}