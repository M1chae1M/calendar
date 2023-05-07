import AuthHOC from "./AuthHOC";
import Router from "next/router";
import Day from "./displayMonths/Day";
import React, {Component} from "react";
import Month from "./displayMonths/Month";
import ChangeYearMenu from "./change_year_menu/ChangeYearMenu";
export const AppStateProvider=React.createContext();

class Applic extends Component{
  state={
    daysInMonths:[],
    actualYear:this.props.dataFromURL?parseInt(this.props.dataFromURL):new Date().getFullYear(),
    alerts:this.props.alerts,
  }
  componentDidMount(){
    this.getDateData(this, this.state.actualYear);
  }
  componentDidUpdate(prev, next){
    if(JSON.stringify(prev.alerts)!==JSON.stringify(next.alerts)) return true
    return null
  }
  getDateData(component, year){
    const daysInMonths=[];
    for(let i=0;i<12;i++){
      const temporaryDate=new Date(year, (i+1), 0);
      daysInMonths.push({
        fullDate:temporaryDate,
        days:temporaryDate.getDate(),
        month:(i+1),
        year:year,
        startsFrom:new Date(year, i, 1).getDay(),
      });
    }
    component.setState({daysInMonths:daysInMonths});
  }
  render(){
    const {daysInMonths, actualYear, alerts}=this.state;
    const {token}=this.props;
    const styles={
      Container:{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit, minmax(155px, 1fr))',
        justifyItems:'center',
      },
      Center:{
        display:'grid',
      },
    }
    const changeActualYear=(chng)=>{
      const newYear=actualYear+chng;
      this.setState({actualYear:newYear},()=>{
        this.getDateData(this, newYear)
        Router.push(`/${newYear}`);
      });
    }
    const changeAlerts=(newAlerts)=>{
      this.setState({alerts:newAlerts},()=>{
        fetch('/api/push',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({token, newAlerts})
        })
      })
    }
    return(
      <AppStateProvider.Provider value={{actualYear, changeActualYear}}>
        <ChangeYearMenu daysInMonths={daysInMonths}/>
        <div id="Container" style={styles.Container}>
        {
          daysInMonths.map((y)=>
          <Month key={y.month} data={y}>
            {Array(y.days).fill(0).map((x,i)=>
              <Day
                key={i+1} data={y}
                withAlert={alerts?.[y.year]?.[y.month]?.[i+1]?.length>0?true:false}
                alerts={alerts} day={i+1}
                changeAlerts={changeAlerts}
              />
            )}
          </Month>)
        }
        </div>
      </AppStateProvider.Provider>
    )
  }
}

export default AuthHOC(Applic)