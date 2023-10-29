import Alert from "./Alert";
import React, {Component} from "react";
import Label from "../little_components/Label";
import AddNewAlertForm from "./AddNewAlertForm";
import AlertsContainer from "./background/alertContainer";
import AddNewAlertContainer from ".";
import AddNewAlertBackground from "./background";

export default class AddNewAlert extends Component{
    render(){
        const {data, showModalF, day, alerts, changeAlerts}=this.props;
        const {year, month}=data??{};
        let taskID;
        const deleteAlert=(index)=>{
            const copyAlerts=alerts?.[year]?.[month]?.[day]&&(alerts);
            const newAlertsBeforeDelete=alerts?.[year]?.[month]?.[day].filter(({ID})=>ID!==index);

            copyAlerts[year][month][day]=newAlertsBeforeDelete;
            changeAlerts(copyAlerts)
        }
        const changeTask=(e, index)=>{
            const target=e.target;
            const {value, type}=target??{};
            const newAlerts=alerts?.[year]?.[month]?.[day];
            const copyAlerts=alerts?.[year]?.[month]?.[day]&&(alerts);
            const changeTaskWithIndex=alerts?.[year]?.[month]?.[day].findIndex(({ID})=>ID===index);

            if(type==='text') newAlerts[changeTaskWithIndex].text=value;
            else newAlerts[changeTaskWithIndex].hour=value;

            copyAlerts[year][month][day]=newAlerts;

            debounce(copyAlerts);
        }
        const close=(e)=>{
            console.log('test')
            if(e.target.id==='background'){
                e.stopPropagation()
                showModalF(false)
            }
        }
        function debounce(copyAlerts){
            if(taskID) clearTimeout(taskID)
            taskID=setTimeout(()=>{changeAlerts(copyAlerts)},1000);
        }
        return(
            <AddNewAlertBackground onClick={close} id="background">
                <AddNewAlertContainer>
                    <Label>add new alert</Label>
                    <AddNewAlertForm showModalF={showModalF}/>
                    <AlertsContainer>
                    {
                        alerts?.[year]?.[month]?.[day]&&                    
                        Array.from(alerts[year][month][day])
                        .sort((a, b)=>a.hour<b.hour?-1:a.hour>b.hour?1:0)
                        .map(({ID, hour, text})=>
                            <Alert key={ID} changeTask={changeTask} text={text} hour={hour} deleteAlert={deleteAlert} ID={ID}/>
                        )
                    }
                    </AlertsContainer>
                </AddNewAlertContainer>
            </AddNewAlertBackground>
        )
    }
}