import App from "./App";

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

const WithDate=({dataFromURL})=>dataFromURL && <App dataFromURL={dataFromURL}/>

export default WithDate