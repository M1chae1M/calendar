import {namesOfDays} from "../_document";
import Label from "../little_components/Label";
import {DaySize} from "../_document";
import colors from '../../config/colors.json'

const WeekDaysHeaders=({changeSelected})=>{
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
    const onMouseLeave=()=>changeSelected('')
    return namesOfDays?.map((x, i)=>(
            <Label key={i} style={styles} onTouchStart={()=>changeSelected(i!==6?i:-1)} onMouseEnter={()=>changeSelected(i!==6?i:-1)} onMouseLeave={onMouseLeave}>{x}</Label>
        )
    )
}
export default WeekDaysHeaders