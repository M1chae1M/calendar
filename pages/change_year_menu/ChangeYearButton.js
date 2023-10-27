import React,{Component} from "react";
import {AppStateProvider} from "../App";
import{AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import styled from "styled-components";

const styles=`font-size:30px;
margin:5px;
&:hover{
    scale: 130%;
    opacity:0.8;
    color:#ff9f9f !important;
}`

const ArrowLeft=styled(AiOutlineArrowLeft)`${styles}`
const ArrowRight=styled(AiOutlineArrowRight)`${styles}`

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
                        <ArrowLeft onClick={onClick}/>:
                            <ArrowRight onClick={onClick}/>
                )
            }}
            </AppStateProvider.Consumer>
        )
    }
}