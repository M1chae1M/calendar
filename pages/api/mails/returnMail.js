const returnMail=(alert)=>{
    const {variant,text,changed,to,from,hour,date}=alert??{}
    const {year}=alert?.date??{}
    const day=date?.day<10?"0"+date?.day:date?.day
    const month=date?.month<10?"0"+date?.month:date?.month
    const fullDate=`${day}-${month}-${year}`
    
    if(variant==='add'){
        return {
            subject:`Dodano nowe wydarzenie dnia ${fullDate}.`,
            text:`Dodano nowe wydarzenie dnia ${fullDate} o godzinie ${hour}. Jego treść brzmi "${text}".`,
        }
    }else if(variant==='change'){
        const changedField=changed==='text'?'treść':'godzinę'
        const old=changed==='text'?from.text:from.hour
        return {
            subject:`Zmieniono wydarzenie dnia ${fullDate}.`,
            text:`Zmieniono ${changedField} z "${old}" na "${to}".`,
        }
    }else if(variant==='delete'){
        return {
            subject:`Usunięto wydarzenie dnia ${fullDate}.`,
            text:`Usunięto wydarzenie dnia ${fullDate}. Jego treść to "${text}", a godzina ${hour}.`,
        }
    }
}

export default returnMail