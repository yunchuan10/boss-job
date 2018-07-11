import React,{Component} from 'react'
import logoPic from './logo.jpg'
import './logo.less'
export default function Logo(){
    return (
        <div className="logo-box">
            <img src={logoPic} alt="logo" />
        </div>
    )
}



