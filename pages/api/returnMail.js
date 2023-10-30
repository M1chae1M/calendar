const returnMail=(alert)=>{
    const {variant,text,changed,to,from,hour}=alert??{}
    const {day,month,year}=alert?.date??{}
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