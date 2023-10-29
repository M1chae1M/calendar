import {myPromise} from './promiseF';

export default(req, res)=>{
    const {body}=req;
    const {login, password}=body;
    const query=`SELECT * FROM profile`;

    myPromise(query)
    .then(data=>{
        if(login===''||password===''||password===login){
            res.status(409).json({message:'Illegal login or password!'})
        }
        else{
            if(data.filter(x=>x.login===login).length>0) res.status(409).json({message:'login busy'})
            else{
                const addNewUserQuery=`INSERT INTO profile (login, password) VALUES ('${login}', SHA2('${password}', 256));`;
                const addNewAlertsQuery=`INSERT INTO alerts (user, alerts) VALUES ('${login}', '');`;

                myPromise(addNewUserQuery)
                myPromise(addNewAlertsQuery)
                res.status(200).json({message:'created new user'})
            }
        }
    })
}