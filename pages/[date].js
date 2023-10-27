import App from "./App";
import React, {Component} from "react";

export async function getStaticPaths(){
    const paths=[]
    for(let i=2000;i<2050;i++) paths.push({params:{date:`${i}`}})
    return {paths, fallback:false}
}
  
export async function getStaticProps({params}){
    const {date}=params
    const dataFromURL=date
    const props={dataFromURL}
    return {props}
}

export default class WithDate extends Component{
    render(){
        const {dataFromURL}=this.props;
        return <>{dataFromURL && <App dataFromURL={dataFromURL}/>}</>
    }
}