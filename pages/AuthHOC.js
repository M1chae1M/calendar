import React, {Component, Fragment} from "react";
import {BiLogOut} from 'react-icons/bi';
import {ImSpinner9} from 'react-icons/im';
import LoginForm from "./login/LoginForm";

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
            const tryToken=localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):'';
            component.setState({token:tryToken},()=>{
                fetchPOST('/api/auth',{token:tryToken})
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
                this.setState({token:'', logged:false, alerts:{}},()=>localStorage.removeItem('token'))
            }
            return(
                <div>
                    <title>Calendar</title>
                    {loadingState===true && <ImSpinner9 style={styles.Spinner}/>}
                    {logged && <BiLogOut style={styles.logout} onClick={logout} className="controll"/>}
                    {
                    loadingState===false && logged &&
                    <ToWrap
                        alerts={downloadedAlerts} logged={logged}
                        {...this.props}
                        token={token}
                    />}
                    {loadingState===false && !logged &&
                    <LoginForm changeStates={changeStates} logged={logged} message={message} {...this.props}/>}
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