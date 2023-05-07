import {colors} from "../AuthHOC";
import React,{Component} from "react";
import Label from "../little_components/Label";
import {fetchPOST} from "../AuthHOC";

export const loginRef=React.createRef();
export const passwordRef=React.createRef();

export default class LoginForm extends Component{
    render(){
        const {changeStates, message}=this.props;
        const styles={
            body:{
                height:'100vh',
                width:'100vw',
                display:'grid',
                justifyContent:'center',
                alignContent:'center',
                justifyItems:'center',
            },
            LoginForm:{
                display:'grid',
                width:'30vw',
                minWidth:'fit-content',
                justifyItems:'center',
            },
            messageBox:{
                height:'1rem',
                minHeight:'1rem',
                color:'red',
                margin:'6px 0px',
            },
            form:{
                display:'grid',
                justifyItems:'center',
                maxWidth:'fit-content',
            },
            info:{
                position:'absolute',
                top:'0%',
                right:'0%',
                color:'white',
                fontSize:'0.8rem',
            },
            textInputs:{
                color:colors.light_green,
                backgroundColor:colors.dark_green,
                border:`solid ${colors.light_green} 2px`,
                margin:'2px 0px',
            },
            buttons:{
                width:'100%',
            },
            button:{
                width:'50%',
                border:`solid ${colors.light_green} 2px`,
                backgroundColor:colors.dark_green,
                color:colors.light_green,
                borderRadius:'5px',
                boxShadow:`1.5px 1.5px ${colors.white}`,
            }
        }
        const tryToLogin=(e)=>{
            changeStates({loadingState:true})

            e.preventDefault();
            const login=loginRef.current.value;
            const password=passwordRef.current.value;

            fetchPOST('/api/login',{login, password})
            .then(({token, logged, message, alerts})=>
            changeStates({token, logged, message, alerts},
                ()=>{
                    token && localStorage.setItem('token', JSON.stringify(token))
                    changeStates({loadingState:false})
                }
            ))
        }
        const singUp=()=>{
            const login=loginRef.current.value;
            const password=passwordRef.current.value;

            fetchPOST('/api/singup',{login, password})
            .then(({message})=>changeStates({message}))
        }
        return(
            <div style={styles.body}>
                <div id="info" style={styles.info}>
                    The database is located on the db4free.net servers, so it may work slowly or may be temporarily unavailable.
                </div>
                <div id="LoginForm" style={styles.LoginForm}>
                    <form onSubmit={tryToLogin} style={styles.form}>
                        <Label>Login</Label>
                        <input style={styles.textInputs} type='text' ref={loginRef} placeholder='login' required/>
                        <Label>Password</Label>
                        <input style={styles.textInputs} type='password' ref={passwordRef} placeholder='password' required/>
                        <div style={styles.buttons}>
                            <input style={styles.button} type="button" value="sign up" onClick={singUp}/>
                            <input style={styles.button} type='submit' value='login'/>
                        </div>
                    </form>
                    <Label style={styles.messageBox}>{message && message}</Label>
                </div>
            </div>
        );
    }
}