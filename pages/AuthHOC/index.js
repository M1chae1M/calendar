import React, {Component} from "react";
import LoginForm from "../login/LoginForm";
import LogoutBTN from "./LogoutBTN";
import {fetchPOST} from "../_document";
import LoadingSpinner from "./LoadingSpinner";

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
                .then(({logged, message, alerts})=>component.setState({logged, message, alerts, loadingState:false},()=>console.log(alerts.alerts)))
            })
        }
        render(){
            const {logged, message, alerts, token, loadingState}=this.state;
            const downloadedAlerts=alerts?.alerts && JSON.parse(alerts.alerts);
            const changeStates=(newStates, callbackFunction)=>{this.setState(newStates, callbackFunction)}
            const logout=()=>{
                this.setState({token:'', logged:false, alerts:{}},()=>localStorage.removeItem('calendar_login_token'))
            }
            return(
                <>
                    {logged && <LogoutBTN onClick={logout}/>}
                    {
                        !loadingState?
                            logged?
                                <ToWrap alerts={downloadedAlerts} logged={logged} {...this.props} token={token}/>:
                            <LoginForm changeStates={changeStates} logged={logged} message={message} {...this.props}/>
                        :<LoadingSpinner/>
                    }
                </>
            )
        }
    }
}

export default AuthHOC;