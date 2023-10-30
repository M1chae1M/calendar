import colors from '../../config/colors.json'
import React, {Component} from "react";
import AddNewAlert from "../add_new_alert/AddNewAlert";
import DayContainer from "./DayContainer";
import {isWeekend} from "../_document";

const alarmHourRef=React.createRef();
const textOfNewAlert=React.createRef();

export const DayStateProvider=React.createContext();

export default class Day extends Component{
  state={
    showModal:false,
  }
  render(){
    const {day, data, alerts, changeAlerts, withAlert,selected,fullDate,changeSelected}=this.props??{};
    const {showModal}=this.state;
    const {startsFrom}=data??0;
    const weekend=isWeekend(fullDate, day)
    const date=new Date(fullDate?.year, fullDate?.month-1, day).getDay()
    const styles={
      color:!withAlert?!weekend?colors.light_green:'black':colors.light_green,
      gridColumnStart:day===1?startsFrom===0?7:startsFrom:'auto',
      backgroundColor:!withAlert?!weekend?'rgb(63, 62, 62)':'rgb(0, 200, 200)':'red',
      border:`solid ${date===selected+1?'2px red':'#0affa1 1px'}`,
    }
    const addNewAlertFunction=()=>{
      const {month, year}=data??{};
      const text=textOfNewAlert.current.value;
      const hour=alarmHourRef.current.value
      const newTaskID=new Date().getTime();
      
      const dayTasks=[...alerts?.[year]?.[month]?.[day] || []];
      dayTasks.push({ID: newTaskID, text, hour});
      
      const newMonth={...alerts?.[year]?.[month], [day]:dayTasks};
      const newYear={...alerts?.[year], [month]:newMonth};
      const updatedAlerts={...alerts, [year]:newYear};
      
      localStorage.setItem('alerts',JSON.stringify(updatedAlerts));
      changeAlerts(updatedAlerts,{variant:'add',text,hour,date:{year,month,day}});
      
    }
    const showModalF=(newState)=>this.setState({showModal:newState})
    const ShowModalTrue=()=>showModalF(true)
    const onMouseEnter=()=>changeSelected(date-1)
    const onMouseLeave=()=>changeSelected('')
    return(
      <>
        <DayContainer date={date} selected={selected} style={styles} onClick={ShowModalTrue} onTouchStart={onMouseEnter} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{day}</DayContainer>
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