import {verifiKey} from '../verifiKey';
import returnMail from '../mails/returnMail';
import sendMail from '../mails/sendMail';
import DB_instance from '../database';
export const JWT=require('jsonwebtoken');

export default async(req, res)=>{
    const {body}=req;
    const {token, newAlerts,alert}=body??'';
    const stringed=JSON.stringify(newAlerts);
    const decodedData=JWT.decode(token,verifiKey);
    const {login}=decodedData??''
    const results=await DB_instance.select('profile',['email'],{login})

    if(results?.length > 0){
        const email=results[0].email;
        const mail_message=await returnMail(alert,email)
        sendMail(email,mail_message)
        await DB_instance.update('alerts',{alerts:stringed},{user:login})
        res.status(200).json({message:'added'})
    }else{
        console.log('Brak wyników.');
        res.status(404).json({message:'profile not found'})
    }
    // const schedule = require('node-schedule');
    // const time='*/3600 * * * * *'
    // const time='*/10 * * * * *'
    // const time='*/25 * * * * *'

    // schedule.scheduleJob(time, async function () {
    //   const queue=await DB_instance.select('alerts_queue','*',{})

    //   const filtered=await queue?.filter(({date})=>((date-new Date())/3600000)<0.5)
    //   await filtered?.map(async ({email,subject,text,id})=>{
    //     await DB_instance.delete('alerts_queue',{id});
    //     await sendMail(email,{subject,text});
    //   })
    // })
}