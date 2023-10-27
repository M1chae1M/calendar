import {colors} from "../AuthHOC";
import React, {Component} from "react";
import HeaderWithDays from "./HeaderWithDays";
import Label from "../little_components/Label";

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

        // height:'125px',
        height:`${(5*40)+5}px`,


        backgroundColor:`${colors.dark_grey}`,
        gridAutoFlow:'row',

        // gridAutoColumns:'20px',
        // gridAutoRows:'20px',
        gridAutoColumns:'33px',
        gridAutoRows:'33px',


        // gridTemplateColumns:'repeat(7, 20px)',
        // gridTemplateRows:'repeat(6, minmax("auto", 20px))',
        gridTemplateColumns:'repeat(7, 33px)',
        gridTemplateRows:'repeat(6, minmax("auto", 33px))',


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
