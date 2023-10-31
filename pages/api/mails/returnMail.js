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

        const insert_data={
            id:null,
            date:`${year}-${month}-${day} ${hour}`,
            subject:`Przypomnienie ${fullDate}`,
            text:`Przypominam, że dnia ${fullDate} o godzinie ${hour} ustawione zostało przypomnienie o treści: ${text}.`,
            email,
            alertID:ID,
        }

        await DB_instance.insert('alerts_queue',insert_data)

        return{
            subject:mail_subject,
            text:mail_text,
        }
    }else if(variant==='change'){
        const changedField=changed==='text'?'treść':'godzinę'
        const old=changed==='text'?from.text:from.hour

        const mail_subject=`Zmieniono wydarzenie dnia ${fullDate}.`
        const mail_text=`Zmieniono ${changedField} z "${old}" na "${to}". ID alertu: ${ID}.`
        
        const update_data={
            date:`${year}-${month}-${day} ${changed==='text'?from.hour:to}`,
            subject:`Przypomnienie ${fullDate}`,
            text:`Przypominam, że dnia ${fullDate} o godzinie ${changed==='text'?from.hour:to} ustawione zostało przypomnienie o treści: ${text}.`,
        }
        const update_where={alertID:ID}

        await DB_instance.update('alerts_queue',update_data,update_where)

        return{
            subject:mail_subject,
            text:mail_text,
        }
    }else if(variant==='delete'){
        const delete_where={alertID:ID}

        await DB_instance.delete('alerts_queue',delete_where)

        return{
            subject:`Usunięto wydarzenie dnia ${fullDate}.`,
            text:`Usunięto wydarzenie dnia ${fullDate}. Jego treść to "${text}", a godzina ${hour}. ID alertu: ${ID}.`,
        }
    }
}

export default returnMail