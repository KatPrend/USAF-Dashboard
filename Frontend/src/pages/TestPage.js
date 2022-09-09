import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

// trying to make connection to backend
import { useState, useEffect } from 'react';

function GetData(){
    const [data,setData] = React.useState(null)

    React.useEffect(() => {
        //fetch '/home' for proxy??
        fetch('/projects')
        .then((res)=>res.json())
        .then((data)=>setData(data.message))
    }, [])
}

function TestPage() {
    return (
        <body>
            <img class="center" src={require('../images/AirForce.jpg')} alt="Air Force logo" width="280" height="250"/>
            <h1 class="text-center">
                <br></br>
                    Welcome to the USAF Project Management Dashbaord
                <br></br>
            </h1>
            <div>
                <ul>
                    <li>{!data ? "loading ..." : data}</li>
                </ul>
            </div>
        </body>
    );
}

export default TestPage;