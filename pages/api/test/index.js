export default (req,res)=>{
    // const schedule = require('node-schedule');

    const time='* * * * *'
    // const time='*/10 * * * * *'

    // const job = schedule.scheduleJob(time, function () {
    //     console.log('To jest testowy console.log.');
    // });
      
    res.json({test:'test'})
}