import React, {Component} from "react";
import {ImSpinner9} from 'react-icons/im';
import LoginForm from "./login/LoginForm";
import LogoutBTN from "./LogoutBTN";

const AuthHOC=(ToWrap)=>{
    return class HOC extends Component{
        state={
            token:'',
            logged:'',
            message:'',
            alerts:{},
            loadingState:true,
        }
        componentDidMount(){
            this.auth(this)
        }
        auth(component){
            const tryToken=localStorage.getItem('calendar_login_token')?JSON.parse(localStorage.getItem('calendar_login_token')):'';
            component.setState({token:tryToken},()=>{
                fetchPOST(`${process.env.NEXT_PUBLIC_API_URL}auth`,{token:tryToken})
                .then(({logged, message, alerts})=>component.setState({logged, message, alerts, loadingState:false}))
            })
        }
        render(){
            const styles={
                Spinner:{
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
                },
                logout:{
                    color:'white',
                    fontSize:'25px',
                    position:'fixed',
                    top:'5px',
                    left:'5px',
                    textShadow:'1px 1px #0affa1',
                },
            }
            const {logged, message, alerts, token, loadingState}=this.state;
            const downloadedAlerts=alerts?.alerts && JSON.parse(alerts.alerts);
            const changeStates=(newStates, callbackFunction)=>{this.setState(newStates, callbackFunction)}
            const logout=()=>{
                this.setState({token:'', logged:false, alerts:{}},()=>localStorage.removeItem('calendar_login_token'))
            }
            return(
                <div>
                    <title>Calendar</title>
                    {logged && <LogoutBTN style={styles.logout} onClick={logout}/>}
                    {
                        !loadingState?
                            logged?
                                <ToWrap alerts={downloadedAlerts} logged={logged} {...this.props} token={token}/>:
                            <LoginForm changeStates={changeStates} logged={logged} message={message} {...this.props}/>
                        :<ImSpinner9 style={styles.Spinner}/>
                    }
                </div>
            )
        }
    }
}

export const colors={
    white:'white',
    light_green:'#0affa1',
    dark_green:'rgb(90, 126, 90)',
    close_or_delete:'#ff9f9f',
    dark_grey:'rgb(63, 62, 62)',
}

export function fetchPOST(path, data){
    return(
      fetch(path,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
      })
      .then(res=>res.json())
    )
}

export default AuthHOC;