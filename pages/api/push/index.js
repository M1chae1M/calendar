import {verifiKey} from '../verifiKey';
import {myPromise} from '../promiseF';
import {ConnectionWithDB} from '../connectionWithDB';
export const JWT=require('jsonwebtoken');
import returnMail from '../mails/returnMail';
import sendMail from '../mails/sendMail';
import DB_instance from '../database';

export default async(req, res)=>{
    const {body}=req;
    const {token, newAlerts,alert}=body??'';
    const stringed=JSON.stringify(newAlerts);
    const decodedData=JWT.decode(token,verifiKey);
    const {login}=decodedData??''
    const query=`UPDATE alerts SET alerts='${stringed}' WHERE alerts.user='${login}';`;
    const getMail=`SELECT profile.email FROM profile WHERE profile.login='${login}';`
    
    const connection=ConnectionWithDB()

    connection.query(getMail, async(error, results, fields) => {
      if(error){
        console.error('Błąd zapytania:', error);
        return connection.end();
      }
      
      if(results.length > 0){
        const email=results[0].email;
        const mail_message=await returnMail(alert,email)
        sendMail(email,mail_message)
      }else{
        console.log('Brak wyników.');
      }
      connection.end();
    });







    const schedule = require('node-schedule');
    const time='*/3600 * * * * *'
    // const time='*/10 * * * * *'
    // const time='*/25 * * * * *'

    schedule.scheduleJob(time, async function () {
      const queue=await DB_instance.select('alerts_queue','*',{})

      const filtered=await queue?.filter(({date})=>((date-new Date())/3600000)<0.5)
      await filtered?.map(async ({email,subject,text,id})=>{
        await DB_instance.delete('alerts_queue',{id});
        await sendMail(email,{subject,text});
      })
    })

    connection.query(query,(err)=>{
      res.send(err)
    });
}