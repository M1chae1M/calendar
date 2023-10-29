import {AiFillCloseCircle} from 'react-icons/ai';
import styled from "styled-components";
import colors from '../../config/colors.json'

const CloseIcon=styled(AiFillCloseCircle)`
transition: all 0.2s ease-in-out;
position: absolute;
top: 10px;
right: 10px;
color: ${colors?.close_or_delete};
font-size: 24px;
&:hover{
  transform: scale(1.3);
  opacity: 0.8;
  color: #ff9f9f !important;
}`;

const CloseBTN=({onClick})=><CloseIcon onClick={onClick}/>

export default CloseBTN;