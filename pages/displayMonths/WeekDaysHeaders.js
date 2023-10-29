import {namesOfDays} from "../_document";
import Label from "../little_components/Label";
import {DaySize} from "../_document";
import colors from '../../config/colors.json'

const WeekDaysHeaders=({changeSelected,selected})=>{
    const {light_green}=colors??'black'
    const styles={
        display:'inline-blocks',
        color:`${light_green}`,
        color:'white',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        width:DaySize,
        height:DaySize,
        display:'grid',
        border:`solid ${light_green} 1px`,
        textShadow:`1px 1px white`,
        textShadow:`1px 1px ${light_green}`,
        fontFamily:'sant-serif',
        margin:'0',
    }
    return namesOfDays?.map((x, i)=>(
            <Label selected={selected} day_id={i} key={i} style={styles} onClick={(e)=>changeSelected(i)}>{x}</Label>
        )
    )
}
export default WeekDaysHeaders