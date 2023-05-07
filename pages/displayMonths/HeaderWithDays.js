import React, {Component} from "react";
import Label from "../little_components/Label";
import {colors} from "../AuthHOC";

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
        gridAutoColumns:'20px',
        gridTemplateColumns:'repeat(7, 20px)',
        border:`solid ${colors.white} 1px`,
        height:'fit-content',
        display:'grid',
        justifyItems:'center',
        borderBottom:'none',
        // border:'solid black 1px',
        // backgroundColor:'rgb(168, 168, 168)',
        // display:'grid',
      },
      namesOfDays:{
        display:'inline-blocks',
        color:`${colors.light_green}`,
        color:'white',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        width:'20px',
        height:'20px',
        display:'grid',
        border:`solid ${colors.light_green} 1px`,
        textShadow:`1px 1px white`,
        textShadow:`1px 1px ${colors.light_green}`,
        fontFamily:'sant-serif',
        margin:'0',
        // textShadow:`1px 1px ${colors.white}`,
        // border:'solid black 1px',
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