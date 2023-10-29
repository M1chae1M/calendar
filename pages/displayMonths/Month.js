import colors from '../../config/colors.json'
import React, {Component} from "react";
import HeaderWithDays from "./HeaderWithDays";
import Label from "../little_components/Label";
import {DaySize} from "../_document";

export default class Month extends Component{
  state={
    selected:'',
  }
  render(){
    const {children, data}=this.props??{};
    const {selected}=this.state
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
    const changeSelected=(newSelected)=>this.setState({selected:newSelected})
    const childrenWithProps = React.Children?.map(children, (child) => {
      if (React.isValidElement(child)){
        return React.cloneElement(child,{
          selected:selected,
          // acDay:data.fullDate.getDay()
        });
      }
      return child;
    });

    // console.log(data.fullDate.getDay())
    return(
      <div className="monthContainer" style={styles.monthContainer}>
        <Label>{monthName}</Label>
        <HeaderWithDays selected={selected} changeSelected={changeSelected}/>
        <div className="Month" style={styles.Month}>{childrenWithProps}</div>
        </div>
    )
  }
}