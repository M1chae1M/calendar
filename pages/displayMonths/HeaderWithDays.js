import React, {Component} from "react";
import Label from "../little_components/Label";
import {colors} from "../AuthHOC";
import {DaySize} from "../_document";

export default class HeaderWithDays extends Component{
  render(){
    const styles={
      header:{
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
      },
      namesOfDays:{
        display:'inline-blocks',
        color:`${colors.light_green}`,
        color:'white',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        width:DaySize,
        height:DaySize,
        display:'grid',
        border:`solid ${colors.light_green} 1px`,
        textShadow:`1px 1px white`,
        textShadow:`1px 1px ${colors.light_green}`,
        fontFamily:'sant-serif',
        margin:'0',
      },
    }
    const namesOfDays=['M','T','W','T','F','S','S'];
    return(
      <div className="header" style={styles.header}>
        {namesOfDays.map((x, i)=><Label key={i} style={styles.namesOfDays}>{x}</Label>)}
      </div>
    );
  }
}