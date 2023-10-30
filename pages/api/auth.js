import {verifiKey} from './verifiKey';
import {myPromise} from './promiseF';
import {ConnectionWithDB} from "./connectionWithDB";
import DB_instance from './database';

export const JWT=require('jsonwebtoken');

export default async(req, res)=>{
    const {body}=req;
    const {token}=body;

    const verification=JWT.decode(token, verifiKey);
    if (verification!==null){
        const data=await DB_instance.select('alerts','*',{user:verification.login})
        res.status(200).json(verification?{logged:true, message:'', alerts:data[0]}:{logged:false, message:''})
    }
    else res.status(200).json({logged: false, message: ''});
}