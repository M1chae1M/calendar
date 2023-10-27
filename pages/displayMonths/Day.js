import {colors} from "../AuthHOC";
import React, {Component} from "react";
import AddNewAlert from "../add_new_alert/AddNewAlert";

const alarmHourRef=React.createRef();
const textOfNewAlert=React.createRef();

export const DayStateProvider=React.createContext();

export default class Day extends Component{
  state={
    showModal:false,
  }
  render(){
    const {day, data, alerts, changeAlerts, withAlert}=this.props;
    const {showModal}=this.state;
    const {startsFrom}=data??0;
    const styles={
      Day:{
        userSelect:'none',
        color:colors.light_green,
        gridColumnStart:day===1?startsFrom===0?7:startsFrom:'auto',
        // width:'20px',
        // height:'20px',

        width:'33px',
        height:'33px',

        display:'grid',
        textAlign:'center',
        alignItems:'center',
        display:'inline-block',
        justifyContent:'center',
        backgroundColor:!withAlert?'rgb(63, 62, 62)':'red',
        border:'solid #0affa1 1px',
      }
    }
    const addNewAlertFunction=()=>{
      const {month, year}=data??{};
      const newAlertText=textOfNewAlert.current.value;
      const newTaskID=new Date().getTime();
      
      const dayTasks=[...alerts?.[year]?.[month]?.[day] || []];
      dayTasks.push({ID: newTaskID, text: newAlertText, hour: alarmHourRef.current.value});
      
      const newMonth={...alerts?.[year]?.[month], [day]:dayTasks};
      const newYear={...alerts?.[year], [month]:newMonth};
      const updatedAlerts={...alerts, [year]:newYear};
      
      localStorage.setItem('alerts',JSON.stringify(updatedAlerts));
      changeAlerts(updatedAlerts);
    }
    const showModalF=(newState)=>this.setState({showModal:newState})
    return(
      <>
        <div className="Day controll" style={styles.Day} onClick={()=>{
          showModalF(true)
          // podświetlaj wszystkie odpowiadające dni tygodnia w tym miesiącu
        }}>{day}</div>
        {
          showModal &&
          <DayStateProvider.Provider value={{alarmHourRef, textOfNewAlert, addNewAlertFunction}}>
            <AddNewAlert day={day} data={data} alerts={alerts} showModalF={showModalF} changeAlerts={changeAlerts}/>
          </DayStateProvider.Provider>
        }
      </>
    )
  }
}