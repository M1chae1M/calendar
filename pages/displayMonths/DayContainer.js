import styled from "styled-components";
import {DaySize} from "../_document";

const DayContainer=styled.div`
display:grid;
text-align:center;
align-items:center;
justify-content:center;
user-select:none;
width:${DaySize};
height:${DaySize};
&:hover{
  scale:130%;
  opacity:0.8;
  color:#ff9f9f !important;
}`

export default DayContainer