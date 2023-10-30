import colors from '../../config/colors.json'
import React,{Component} from "react";
import Label from "../little_components/Label";
import {fetchPOST} from '../_document';
import Info from "./Info";
import Buttons from "./Buttons";

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
            textInputs:{
                color:colors.light_green,
                backgroundColor:colors.dark_green,
                border:`solid ${colors.light_green} 2px`,
                margin:'2px 0px',
            },
        }
        const tryToLogin=(e)=>{
            changeStates({loadingState:true})

            e.preventDefault();
            const login=loginRef.current.value;
            const password=passwordRef.current.value;

            fetchPOST(`${process.env.NEXT_PUBLIC_API_URL}login`,{login, password})
            .then(({token, logged, message, alerts})=>
            changeStates({token, logged, message, alerts},
                ()=>{
                    token && localStorage.setItem('calendar_login_token', JSON.stringify(token))
                    changeStates({loadingState:false})
                }
            ))
        }
        const singUp=()=>{
            const login=loginRef.current.value;
            const password=passwordRef.current.value;
            
            fetchPOST(`${process.env.NEXT_PUBLIC_API_URL}singup`,{login, password})
            .then(({message})=>changeStates({message}))
        }
        return(
            <div style={styles.body}>
                <Info/>
                <div id="LoginForm" style={styles.LoginForm}>
                    <form onSubmit={tryToLogin} style={styles.form}>
                        <Label>Login</Label>
                        <input style={styles.textInputs} type='text' ref={loginRef} placeholder='login' required/>
                        <Label>Password</Label>
                        <input style={styles.textInputs} type='password' ref={passwordRef} placeholder='password' required/>
                        <Buttons singUp={singUp}/>
                    </form>
                    <Label style={styles.messageBox}>{message && message}</Label>
                </div>
            </div>
        );
    }
}