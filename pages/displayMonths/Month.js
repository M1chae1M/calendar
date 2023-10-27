import {colors} from "../AuthHOC";
import React, {Component} from "react";
import HeaderWithDays from "./HeaderWithDays";
import Label from "../little_components/Label";
import {DaySize} from "../_document";

export default class Month extends Component{
  render(){
    const {children, data}=this.props??{};
    const monthName=data?.fullDate?.toLocaleString('en',{month:'long'})
    const styles={
      monthContainer:{
        height:'auto',
        margin:'5px',
      },
      Month:{
        gridColumnStart:'auto',
        width:'fit-content',
        padding:'1px',
        gridGap:'1px',
        height:`${(5*DaySize)+5}px`,
        backgroundColor:`${colors.dark_grey}`,
        gridAutoFlow:'row',
        gridAutoColumns:DaySize,
        gridAutoRows:DaySize,
        gridTemplateColumns:`repeat(7, ${DaySize})`,
        gridTemplateRows:`repeat(6, minmax("auto", ${DaySize}))`,
        border:`solid ${colors.white} 1px`,
        display:'grid',
        height:'fit-content',
        borderTop:'none',
      }
    }
    return(
      <div className="monthContainer" style={styles.monthContainer}>
        <Label>{monthName}</Label>
        <HeaderWithDays/>
        <div className="Month" style={styles.Month}>{children}</div>
      </div>
    );
  }
}
