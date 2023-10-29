import Label from "../little_components/Label";
import React,{Component} from "react";
import ChangeYearButton from "./ChangeYearButton";

export default class ChangeYearMenu extends Component{
    render(){
        const {daysInMonths}=this.props;
        const styles={
            textAlign:'center'
        }
        const year=daysInMonths?.[0]?.year
        return(
            <div id="changeYear" style={styles}>
                <Label>
                    <ChangeYearButton change={-1}/>
                        {year}
                    <ChangeYearButton change={+1}/>
                </Label>
            </div>
        )
    }
}