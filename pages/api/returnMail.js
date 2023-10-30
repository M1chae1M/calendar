const returnMail=(alert)=>{
    const {variant,text,changed,to,from,hour,date}=alert??{}
    const {year}=alert?.date??{}
    const day=date?.day<10?"0"+date?.day:date?.day
    const month=date?.month<10?"0"+date?.month:date?.month
    
    if(variant==='add'){
        return {
            subject:`Dodano nowe wydarzenie dnia ${day}-${month}-${year}.`,
            text:`Dodano nowe wydarzenie dnia ${day}-${month}-${year} o godzinie ${hour}. Jego treść brzmi "${text}".`,
        }
    }else if(variant==='change'){
        return {
            subject:`Zmieniono wydarzenie dnia ${day}-${month}-${year}.`,
            text:`Zmieniono ${changed==='text'?'treść':'godzinę'} z "${changed==='text'?from.text:from.hour}" na "${to}".`,
        }
    }else if(variant==='delete'){
        return {
            subject:`Usunięto wydarzenie dnia ${day}-${month}-${year}.`,
            text:`Usunięto wydarzenie dnia ${day}-${month}-${year}. Jego treść to "${text}", a godzina ${hour}.`,
        }
    }
}

export default returnMail