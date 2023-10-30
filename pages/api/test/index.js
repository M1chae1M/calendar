import DB_instance from '../database';
import sendMail from '../mails/sendMail';

export default async(req,res)=>{
    const schedule = require('node-schedule');
    const time='*/3600 * * * * *'

    const job = schedule.scheduleJob(time, async function () {
        const queue=await DB_instance.select('alerts_queue','*',{})

        const filtered=await queue?.filter(({date})=>((date-new Date())/3600000)<0.5)
        await filtered?.map(async ({email,subject,text,id})=>{
            await DB_instance.delete('alerts_queue',{id});
            await sendMail(email,{subject,text});
        })
    })
      
    res.json({test:'test'})
}