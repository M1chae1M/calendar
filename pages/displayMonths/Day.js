import {colors} from "../AuthHOC";
import React, {Component} from "react";
import AddNewAlert from "../add_new_alert/AddNewAlert";
import DayContainer from "./DayContainer";
import {isWeekend, namesOfDays} from "../_document";

const alarmHourRef=React.createRef();
const textOfNewAlert=React.createRef();

export const DayStateProvider=React.createContext();

export default class Day extends Component{
  state={
    showModal:false,
  }
  render(){
    const {day, data, alerts, changeAlerts, withAlert,selected,y_test}=this.props??{};
    const {showModal}=this.state;
    const {startsFrom}=data??0;
    const weekend=isWeekend(y_test, day)



    const date=new Date(y_test?.year, y_test?.month-1, day);
    // const dayOfWeek=namesOfDays[date.getDay()];
    // date.getDay()===selected && console.log(dayOfWeek);

    const styles={
      color:!withAlert?!weekend?colors.light_green:'black':colors.light_green,
      gridColumnStart:day===1?startsFrom===0?7:startsFrom:'auto',
      backgroundColor:!withAlert?!weekend?'rgb(63, 62, 62)':'rgb(0, 200, 200)':'red',
    //   border:`solid 2px ${date.getDay()===selected+1 ? 'red':'black'}`,
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
    const ShowModalTrue=()=>showModalF(true)



    return(
      <>
        <DayContainer style={styles} onClick={ShowModalTrue}>
            {day}
            {/* {data.fullDate.getDay()===selected && day} */}
            {/* {selected} */}
            {/* {data.fullDate.getDay()} */}
            {/* {console.log(data.fullDate)} */}
            {/* {console.log(y_test.fullDate)} */}

            {/* {y_test.fullDate.getDay()} */}
            </DayContainer>



        {/* {console.log(acDay,selected)} */}
        {/* {acDay} */}
        {/* {selected} */}
        {/* {acDay===selected && 't'} */}
        {/* {data.fullDate.getDay()} */}
        {/* {data.fullDate.getDay()===selected && console.log(data.fullDate.getDay())} */}


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