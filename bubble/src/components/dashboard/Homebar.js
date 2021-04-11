import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

import homebarImg from "../../resources/logo.png";

function Homebar(props) {
    return(
        <div className='homebar-container'>
            <div className="homebar-image">
                <a href='/'>
                    <img src={homebarImg} id='logo'/>
                </a>
            </div>
        </div>
    )
}

export default Homebar;