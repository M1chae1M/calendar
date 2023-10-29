import {AppStateProvider} from "../App";
import{AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai';
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

const ChangeYearButton=({change})=>(
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

export default ChangeYearButton