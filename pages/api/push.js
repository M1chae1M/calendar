import {verifiKey} from './verifiKey';
import {myPromise} from './promiseF';
import {ConnectionWithDB} from './connectionWithDB';
export const JWT=require('jsonwebtoken');

module.exports=(req, res)=>{
    const {body}=req;
    const {token, newAlerts}=body??'';
    const stringed=JSON.stringify(newAlerts);
    const decodedData=JWT.decode(token,verifiKey);
    const query=`UPDATE alerts SET alerts='${stringed}' WHERE alerts.user='${decodedData.login}';`;

    const connection=ConnectionWithDB()
    connection.query(query,(err)=>{
        res.send(err)
    });
}