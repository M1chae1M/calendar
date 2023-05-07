import {verifiKey} from './verifiKey';
import {myPromise} from './promiseF';
export const JWT = require('jsonwebtoken');

module.exports=(req, res)=>{
    const {body}=req
    const {token, newAlerts}=body
    const stringed=JSON.stringify(newAlerts)
    const decodedData=JWT.decode(token,verifiKey)
    const query=`UPDATE ${process.env.DB_ALERTS_TABLE} SET alerts = '${stringed}' WHERE ${process.env.DB_ALERTS_TABLE}.user = '${decodedData.login}';`

    myPromise(query)
}