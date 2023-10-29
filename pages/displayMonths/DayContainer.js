import styled from "styled-components";
import {DaySize} from "../_document";

const DayContainer=styled.div`
display:grid;
text-align:center;
align-items:center;
justify-content:center;
// border:solid #0affa1 1px;
user-select:none;
width:${DaySize};
height:${DaySize};
// border:${({date, selected})=>date===selected+1 ? 'solid 2px red':'solid #0affa1 1px'},

&:hover{
  scale:130%;
  opacity:0.8;
  color:#ff9f9f !important;
}`

export default DayContainer