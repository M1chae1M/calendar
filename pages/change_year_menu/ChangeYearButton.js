import React,{Component} from "react";
import {AppStateProvider} from "../App";
import{AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';

export default class ChangeYearButton extends Component{
    render(){
        const {change}=this.props;
        return(
            <AppStateProvider.Consumer>
            {value=>{
                const {changeActualYear}=value??{};
                const onClick=()=>changeActualYear(change)
                return(
                    change<0?
                        <AiOutlineArrowLeft onClick={onClick} className="controll"/>:
                            <AiOutlineArrowRight onClick={onClick} className="controll"/>
                )
            }}
            </AppStateProvider.Consumer>
        )
    }
}