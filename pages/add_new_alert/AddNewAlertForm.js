import React, {Component} from "react";
import colors from '../../config/colors.json'
import {DayStateProvider} from "../displayMonths/Day";
import CloseBTN from "./CloseBTN";

export default class AddNewAlertForm extends Component{
    render(){
        const styles={
            form:{
                display:'grid',
                width:'100%',
                maxWidth:'100%',
                justifyContent:'center',
                gridTemplateColumns:'1fr 2fr 1fr',
                gridTemplateColumns:'25% 50% 25%',
            },
            inputs:{
                color:colors.white,
                backgroundColor:colors.dark_green,
                border:`solid ${colors.light_green} 2px`,
                padding:'1px 3px',
                minWidth:'10px',
            },
            button:{
                padding:'1px 3px',
                border:`solid ${colors.light_green} 2px`,
                backgroundColor:colors.dark_green,
                color:colors.white,
                borderRadius:'5px',
                boxShadow:`1.5px 1.5px ${colors.white}`,
                minWidth:'10px',
            },
            rightInput:{
                borderTopRightRadius:'5px',
                borderBottomRightRadius:'5px',
            }
        }
        const {showModalF}=this.props;
        return(
            <DayStateProvider.Consumer>
            {value=>{
                const {alarmHourRef, textOfNewAlert, addNewAlertFunction}=value??{};
                const onSubmit=(e)=>{
                    e.preventDefault();
                    addNewAlertFunction();
                    alarmHourRef.current.value='12:00';
                    textOfNewAlert.current.value='';
                }
                const onClick=(e)=>{
                    e.stopPropagation();
                    showModalF(false);
                }
                return(
                    <form style={styles.form} onSubmit={onSubmit}>
                        <input style={styles.inputs} type="time" defaultValue={'12:00'} ref={alarmHourRef}/>
                        <input style={{...styles.inputs, ...styles.rightInput}} type="text" placeholder="new alert" id="addAlert" ref={textOfNewAlert}/>
                        <input style={styles.button} type="submit" value="add"/>
                        <CloseBTN onClick={onClick}/>
                    </form>
                )
            }}
            </DayStateProvider.Consumer>
        )
    }
}