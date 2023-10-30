import {ImSpinner9} from "react-icons/im"

const styles={
    animation:'spinner linear 2s infinite',
    width:'100px',
    height:'100px',
    position:'absolute',
    margin:'auto',
    left:'0',
    top:'0',
    right:'0',
    bottom:'0',
    color:'white',
    textShadow:'1px 1px #0affa1',
}

const LoadingSpinner=()=><ImSpinner9 style={styles}/>

export default LoadingSpinner