import React, {Component} from "react";
import HeaderWithDays from "./HeaderWithDays";
import Label from "../little_components/Label";
import MonthContainer from './MonthContainer';

export default class Month extends Component{
  state={
    selected:'',
  }
  render(){
    const {children, data}=this.props??{};
    const {selected}=this.state
    const monthName=data?.fullDate?.toLocaleString('en',{month:'long'})
    const styles={
      height:'auto',
      margin:'5px',
    }
    const changeSelected=(newSelected)=>this.setState({selected:newSelected})
    const childrenWithProps=React.Children?.map(children, (child)=>{
      if(React.isValidElement(child)){
        return React.cloneElement(child,{selected,changeSelected})
      }
      return child;
    })
    return(
      <div style={styles}>
        <Label>{monthName}</Label>
        <HeaderWithDays selected={selected} changeSelected={changeSelected}/>
        <MonthContainer>{childrenWithProps}</MonthContainer>
      </div>
    )
  }
}