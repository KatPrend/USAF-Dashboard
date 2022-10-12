import React from 'react';
import './home.css';

import { SignInButton } from '../components/SignInButton';

function Home() {
    return (
        <div style={{padding: "5%"}}>
            <img className="center" src={require('../images/AirForce.jpg')} alt="Air Force logo" width="280" height="250"/>
            <h1 className="text-center">
                <br></br>
                Welcome to the USAF Project Management Dashbaord
                <br></br>
            </h1>
            <div className="mx-auto w-50">   
                <br></br>
                <SignInButton/ >
                <br></br>
            </div>
        </div>
    );
}

export default Home;