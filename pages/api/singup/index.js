import DB_instance from '../database';
import {myPromise} from '../promiseF';
import {verifiKey} from '../verifiKey';
import {ConnectionWithDB} from '../connectionWithDB';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';

export default async(req, res)=>{
    const {body}=req??{};
    const {login, password}=body??'';
    const data=await DB_instance.select('profile','*',{})

    if(login===''||password===''||password===login){
        res.status(409).json({message:'Illegal login or password!'})
    }
    else{
        if(data.filter(x=>x.login===login).length>0) res.status(409).json({message:'login busy'})
        else{
            const addNewUserQuery=`INSERT INTO profile (login, password) VALUES ('${login}', SHA2('${password}', 256));`;

            myPromise(addNewUserQuery)
            await DB_instance.insert('alerts',{user:login,alerts:''})
            res.status(200).json({message:'created new user'})
        }
    }
}