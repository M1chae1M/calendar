import styled from "styled-components";
import {BiLogOut} from 'react-icons/bi';

const LogoutBTN=styled(BiLogOut)`
color:white;
font-size:35px;
position:fixed;
top:5px;
left:5px;
text-shadow:1px 1px #0affa1;
&:hover{
    scale: 130%;
    opacity:0.8;
    color:#ff9f9f !important;
}`

export default LogoutBTN