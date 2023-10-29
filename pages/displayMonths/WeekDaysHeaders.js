import {namesOfDays} from "../_document";
import Label from "../little_components/Label";
import {DaySize} from "../_document";

const WeekDaysHeaders=({colors})=>{
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
            <Label key={i} style={styles} onClick={(e)=>console.log(`test ${x} ${i}`)}>{x}</Label>
        )
    )
}
export default WeekDaysHeaders