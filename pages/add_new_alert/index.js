import colors from '../../config/colors.json'

const styles={
    overflow:'hidden',
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    width:'70%',
    height:'70%',
    backgroundColor:colors.dark_green,
    padding:'5px',
    borderRadius:'6.7px',
    border:`solid ${colors.light_green} 2px`,
    boxShadow:`2px 2px ${colors.white}`,
    display:'grid',
    gridTemplateRows:'35px 30px 7fr',
}

const AddNewAlertContainer=({children})=><div style={styles}>{children}</div>

export default AddNewAlertContainer