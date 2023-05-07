import Label from "../little_components/Label";
import React,{Component, Fragment} from "react";
import ChangeYearButton from "./ChangeYearButton";

export default class ChangeYearMenu extends Component{
    render(){
        const {daysInMonths}=this.props;
        const styles={
            changeYear:{
              textAlign:'center',
            },
        }
        return(
            <div id="changeYear" style={styles.changeYear}>
                <Label>
                    <ChangeYearButton change={-1}/>
                        {daysInMonths?.[0]?.year}
                    <ChangeYearButton change={+1}/>
                </Label>
            </div>
        )
    }
}