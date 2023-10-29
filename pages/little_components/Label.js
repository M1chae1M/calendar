import colors from '../../config/colors.json'
import React,{Component} from "react";

export default class Label extends Component{
    render(){
        const {style,children,selected,day_id}=this.props
        const styles={
            Label:{
                width:'100%',
                textAlign:'center',
                fontWeight:'bold',
                userSelect:'none',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                color:colors.light_green,
                color:colors.white,
                textShadow:`1px 1px ${colors.light_green}`,
                fontFamily:'"Press Start 2P", cursive',
                margin:'2px',
                // color:'red !important',
                // selected
// day_id
// border:`solid 1px ${selected===day_id?'red':'black'}`,
// boxShadow:'2px 2px red',
            }
        }
        return <div id="Label" style={{...styles.Label, ...style}} {...this.props}>{children}</div>
    }
}