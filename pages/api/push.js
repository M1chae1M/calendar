import {verifiKey} from './verifiKey';
import {myPromise} from './promiseF';
import {ConnectionWithDB} from './connectionWithDB';
export const JWT=require('jsonwebtoken');

module.exports=(req, res)=>{
    const {body}=req;
    const {token, newAlerts}=body??'';
    const stringed=JSON.stringify(newAlerts);
    const decodedData=JWT.decode(token,verifiKey);
    const {login}=decodedData;
    const query=`INSERT INTO alerts (user, alerts) VALUES ('${login}', '${stringed}') ON DUPLICATE KEY UPDATE alerts='${stringed}';`;
    
    ConnectionWithDB().query(query,(err)=>{
        res.send(err)
    });
}