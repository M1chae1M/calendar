import DB_instance from "../database"

const returnMail=async(alert,email)=>{
    const {variant,text,changed,to,from,hour,date,ID}=alert??{}
    const {year}=alert?.date??{}
    const day=date?.day<10?"0"+date?.day:date?.day
    const month=date?.month<10?"0"+date?.month:date?.month
    const fullDate=`${day}-${month}-${year}`

    if(variant==='add'){
        const mail_subject=`Dodano nowe wydarzenie dnia ${fullDate}.`
        const mail_text=`Dodano nowe wydarzenie dnia ${fullDate} o godzinie ${hour}. Jego treść brzmi "${text}". ID alertu: ${ID}.`




        await DB_instance.insert('alerts_queue',{
            id:null,
            date:`${year}-${month}-${day} ${hour}`,
            subject:mail_subject,
            text:mail_text,
            email,
            alertID:ID,
        })



        return{
            subject:mail_subject,
            text:mail_text,
        }
    }else if(variant==='change'){
        console.log(ID)


        



        const changedField=changed==='text'?'treść':'godzinę'
        const old=changed==='text'?from.text:from.hour
        return{
            subject:`Zmieniono wydarzenie dnia ${fullDate}.`,
            text:`Zmieniono ${changedField} z "${old}" na "${to}". ID alertu: ${ID}.`,
        }
    }else if(variant==='delete'){
        console.log(ID)





        return{
            subject:`Usunięto wydarzenie dnia ${fullDate}.`,
            text:`Usunięto wydarzenie dnia ${fullDate}. Jego treść to "${text}", a godzina ${hour}. ID alertu: ${ID}.`,
        }
    }
}

export default returnMail