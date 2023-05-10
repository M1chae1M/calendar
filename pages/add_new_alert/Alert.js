import React, {Component} from "react";
import {colors} from "../AuthHOC";

export default class Alert extends Component{
    render(){
        const {ID, hour, text, changeTask, deleteAlert}=this.props;
        const styles={
            Alert:{
                justifyContent:'center',
                display:'grid',
                gridTemplateColumns:'25% 50% calc(25%)',
                height:'30px',
                width:'1fr',
                overflow:'hidden',
            },
            inputs:{
                color:colors.light_green,
                color:colors.white,
                backgroundColor:colors.dark_green,
                border:`solid ${colors.light_green} 2px`,
                minWidth:'10px',
            },
            button:{
                padding:'1px 3px',
                border:`solid ${colors.close_or_delete} 2px`,
                backgroundColor:colors.dark_green,
                color:colors.white,
                borderRadius:'5px',
                boxShadow:`1.5px 1.5px ${colors.white}`,
                minWidth:'10px',
            },
            textInput:{
                borderTopRightRadius:'5px',
                borderBottomRightRadius:'5px',
            },
        }
        const preventSubmit=(e)=>{
            e.preventDefault();
        }
        return(
            <form key={ID} style={styles.Alert} id="Alert" onSubmit={preventSubmit}>
                <input style={styles.inputs} type="time" defaultValue={hour} onChange={(e)=>{changeTask(e, ID)}}/>
                <input style={{...styles.inputs, ...styles.textInput}} type="text" defaultValue={text} onChange={(e)=>{changeTask(e, ID)}}/>
                <input style={styles.button} type="button" value="🗑️" onClick={()=>{deleteAlert(ID)}}/>
            </form>
        )
    }
}