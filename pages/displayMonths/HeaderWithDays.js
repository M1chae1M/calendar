import React, {Component} from "react";
import colors from '../../config/colors.json'
import {DaySize} from "../_document";
import WeekDaysHeaders from "./WeekDaysHeaders";

export default class HeaderWithDays extends Component{
  render(){
    const {changeSelected,selected}=this.props
    const styles={
      marginTop:'5px',
      userSelect:'none',
      gridColumnStart:'auto',
      width:'fit-content',
      padding:'1px',
      gridGap:'1px',
      backgroundColor:`${colors.dark_grey}`,
      gridAutoFlow:'row',
      gridAutoColumns:DaySize,
      gridTemplateColumns:`repeat(7, ${DaySize})`,
      border:`solid ${colors.white} 1px`,
      height:'fit-content',
      display:'grid',
      justifyItems:'center',
      borderBottom:'none',
    }
    return(
      <div className="header" style={styles}>
        <WeekDaysHeaders selected={selected} changeSelected={changeSelected}/>
      </div>
    )
  }
}