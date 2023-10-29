import colors from '../../config/colors.json'

const Buttons=({singUp})=>{
    const {light_green,dark_green,white}=colors??'black'
    const styles={
        buttons:{
            width:'100%',
        },
        button:{
            width:'50%',
            border:`solid ${light_green} 2px`,
            backgroundColor:dark_green,
            color:light_green,
            borderRadius:'5px',
            boxShadow:`1.5px 1.5px ${white}`,
        }
    }
    return(
        <div style={styles.buttons}>
            <input style={styles.button} type="button" value="sign up" onClick={singUp}/>
            <input style={styles.button} type='submit' value='login'/>
        </div>
    )
}

export default Buttons