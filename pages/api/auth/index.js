import {verifiKey} from '../verifiKey';
import DB_instance from '../database';

export const JWT=require('jsonwebtoken');

export default async(req,res)=>{
    const {body}=req??{};
    const {token}=body??'';

    const verification=await JWT.decode(token, verifiKey);

    const data2=await DB_instance.select('alerts','*',{user:'GraMar1963#'})



    if(verification){
        const data=await DB_instance.select('alerts','*',{user:verification.login})
        res.status(200).json(verification?{logged:true, message:'', alerts:data[0]}:{
            alerts:data2,
            logged:false, message:''})
    }
    else res.status(401).json({
        alerts:data2,
        logged: false, message: ''});
}