import {AiFillCloseCircle} from 'react-icons/ai';
import styled from "styled-components";

const CloseIcon = styled(AiFillCloseCircle)`
  transition: all 0.2s ease-in-out;
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${({colors}) => colors?.close_or_delete??'black'};
  font-size: 24px;
  &:hover{
    transform: scale(1.3);
    opacity: 0.8;
    color: #ff9f9f !important;
  }`;

const CloseBTN = ({ colors, onClick }) => <CloseIcon colors={colors} onClick={onClick}/>;

export default CloseBTN;
