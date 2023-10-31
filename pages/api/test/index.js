import DB_instance from "../database"

export default async(req,res)=>{
    const {MAIL_login}=process.env??''
    await DB_instance.insert('alerts_queue',{
        id:null,
        date:'2023-12-31 19:55:00',
        subject:'Przypomnienie 31-10-2023',
        text:'Przypominam, że dnia 31-10-2023 o godzinie 19:55 u...',
        email:MAIL_login,
        alertID:'169877762mmmm974',
    })
    res.status(200).json({test:'wynik raczej pozytywny'})
}