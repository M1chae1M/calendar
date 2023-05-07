import {myPromise} from './promiseF';

module.exports=(req, res)=>{
    const {body}=req;
    const {login, password}=body;
    const query=`SELECT * FROM ${process.env.DB_PROFILE_TABLE}`;

    myPromise(query)
    .then(data=>{
        if(data.filter(x=>x.login===login).length>0) res.status(200).json({message:'login busy'})
        else{
            const addNewUserQuery=`INSERT INTO ${process.env.DB_PROFILE_TABLE} (login, password) VALUES ('${login}', SHA2('${password}', 256));`;
            const addNewAlertsQuery=`INSERT INTO ${process.env.DB_ALERTS_TABLE} (user, alerts) VALUES ('${login}', '');`;

            myPromise(addNewUserQuery)
            myPromise(addNewAlertsQuery)

            res.status(200).json({message:'created new user'})
        }
    })
}