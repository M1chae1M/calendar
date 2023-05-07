import Router from "next/router";
import React, {Component} from "react";

export default class RouteToYear extends Component{
  componentDidMount(){
    this.RouteToActualYear();
  }
  RouteToActualYear(){
    Router.push(`/${new Date().getFullYear()}`)
  }
  render(){return <></>}
}