import {verifiKey} from './verifiKey';
import {myPromise} from './promiseF';
import {ConnectionWithDB} from './connectionWithDB';
export const JWT=require('jsonwebtoken');
import returnMail from './returnMail';
import sendMail from './sendMail';

export default (req, res)=>{
    const {body}=req;
    const {token, newAlerts,alert}=body??'';
    const stringed=JSON.stringify(newAlerts);
    const decodedData=JWT.decode(token,verifiKey);
    const {login}=decodedData??''
    const query=`UPDATE alerts SET alerts='${stringed}' WHERE alerts.user='${login}';`;
    const getMail=`SELECT profile.email FROM profile WHERE profile.login='${login}';`
    
    const connection=ConnectionWithDB()

    connection.query(getMail, (error, results, fields) => {
        if(error){
          console.error('Błąd zapytania:', error);
          return connection.end();
        }
      
        if(results.length > 0){
            const email=results[0].email;
            const mail_message=returnMail(alert)
            sendMail(email,mail_message)
        }else{
          console.log('Brak wyników.');
        }
        connection.end();
    });

    connection.query(query,(err)=>{
        res.send(err)
    });
}