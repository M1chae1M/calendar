import React,{Component} from "react";
import {AppStateProvider} from "../App";
import{AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';

export default class ChangeYearButton extends Component{
    render(){
        const {change}=this.props;
        return(
            <AppStateProvider.Consumer>
            {value=>{
                const {changeActualYear}=value ?? {};
                return(<>{
                    change<0?
                        <AiOutlineArrowLeft onClick={()=>{changeActualYear(change)}} className="controll"/>:
                            <AiOutlineArrowRight onClick={()=>{changeActualYear(change)}} className="controll"/>
                }</>)
            }}
            </AppStateProvider.Consumer>
        )
    }
}