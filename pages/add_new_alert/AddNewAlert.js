import Alert from "./Alert";
import colors from '../../config/colors.json'
import React, {Component} from "react";
import Label from "../little_components/Label";
import AddNewAlertForm from "./AddNewAlertForm";

export default class AddNewAlert extends Component{
    render(){
        const {data, showModalF, day, alerts, changeAlerts}=this.props;
        const {year, month}=data??{};
        let taskID;
        const styles={
            AddNewAlert:{
                overflow:'hidden',
                position:'fixed',
                top:'50%',
                left:'50%',
                transform:'translate(-50%, -50%)',
                width:'70%',
                height:'70%',
                backgroundColor:colors.dark_green,
                padding:'5px',
                borderRadius:'6.7px',
                border:`solid ${colors.light_green} 2px`,
                boxShadow:`2px 2px ${colors.white}`,
                display:'grid',
                gridTemplateRows:'35px 30px 7fr',
            },
            background:{
                left:'0%',
                top:'0%',
                width:'100%',
                height:'100%',
                position:'fixed',
                backgroundColor:'transparent',
                zIndex:'1410',
            },
            alertsContainer:{
                justifyContent:'center',
                overflow:'overlay',
            },
            header:{
                margin:'4px 0px',
            },
        }
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
            <div style={styles.background} onClick={close} id="background">
                <div style={styles.AddNewAlert}>
                <Label style={styles.header}>add new alert</Label>
                    <AddNewAlertForm showModalF={showModalF}/>
                    <div style={styles.alertsContainer}>
                    {
                        alerts?.[year]?.[month]?.[day]&&                    
                        Array.from(alerts[year][month][day])
                        .sort((a, b)=>a.hour<b.hour?-1:a.hour>b.hour?1:0)
                        .map(({ID, hour, text})=>
                            <Alert key={ID} changeTask={changeTask} text={text} hour={hour} deleteAlert={deleteAlert} ID={ID}/>
                        )
                    }
                    </div>
                </div>
            </div>
        )
    }
}