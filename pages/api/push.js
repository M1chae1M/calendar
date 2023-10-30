import {verifiKey} from './verifiKey';
import {myPromise} from './promiseF';
import {ConnectionWithDB} from './connectionWithDB';
export const JWT=require('jsonwebtoken');

export default (req, res)=>{
    const {body}=req;
    const {token, newAlerts,alert}=body??'';
    const stringed=JSON.stringify(newAlerts);
    const decodedData=JWT.decode(token,verifiKey);
    const query=`UPDATE alerts SET alerts='${stringed}' WHERE alerts.user='${decodedData.login}';`;
    const getMail=`SELECT profile.email FROM profile WHERE profile.login='${decodedData.login}';`
    
    const connection=ConnectionWithDB()


    connection.query(getMail, (error, results, fields) => {
        if (error) {
          console.error('Błąd zapytania:', error);
          return connection.end();
        }
      
        if (results.length > 0) {
          const email = results[0].email;
            console.log('Znaleziony email:', email);
            console.log(alert)

            const {variant}=alert??{}
            if(variant==='add'){
                console.log('add variant')
            }else if(variant==='change'){
                console.log('change variant')
            }else if(variant==='delete'){
                console.log('delete variant') 
            }
// `zmieniono ${type==='text'?'treść':'godzinę'} z ${type==='text'?newAlerts[changeTaskWithIndex].text
// : newAlerts[changeTaskWithIndex].hour} na ${value}`



        //   const nodemailer=require('nodemailer');
    
        //   const transporter = nodemailer.createTransport({
        //       host: 'smtp.wp.pl',
        //       port: 465,
        //       secure: true,
        //       auth: {
        //         user: MAIL_login,
        //         pass: MAIL_password,
        //       },
        //     });
        //     const mailOptions={
        //         from:MAIL_login,
        //         to:MAIL_login,
        //         subject:'Temat wiadomości',
        //         text:'Treść wiadomości',
        //     };
              
        //     transporter.sendMail(mailOptions, (error, info) => {
        //         if (error) {
        //           console.log('Błąd wysyłania e-mailad:' + error);
        //         } else {
        //           console.log('E-mail został wysłanyd:' + info.response);
        //         }
        //     });





        } else {
          console.log('Brak wyników.');
        }
        connection.end();
    });


    connection.query(query,(err)=>{
        res.send(err)
    });
}