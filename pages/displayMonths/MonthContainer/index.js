import {DaySize} from "@/pages/_document"
import colors from '../../../config/colors.json'

const styles={
    gridColumnStart:'auto',
    width:'fit-content',
    padding:'1px',
    gridGap:'1px',
    height:`${(5*DaySize)+5}px`,
    backgroundColor:`${colors.dark_grey}`,
    gridAutoFlow:'row',
    gridAutoColumns:DaySize,
    gridAutoRows:DaySize,
    gridTemplateColumns:`repeat(7, ${DaySize})`,
    gridTemplateRows:`repeat(6, minmax("auto", ${DaySize}))`,
    border:`solid ${colors.white} 1px`,
    display:'grid',
    height:'fit-content',
    borderTop:'none',
}

const MonthContainer=({children})=><div style={styles}>{children}</div>

export default MonthContainer