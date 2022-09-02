import React from 'react';
import './home.css';

import { SignInButton } from '../components/SignInButton';

function Home() {
    return (
        <body>
            <img class="center" src={require('./AirForce.jpg')} alt="Air Force logo" width="280" height="250"/>
            <h1 class="text-center">
                <br></br>
                Welcome to the USAF Project Management Dashbaord
                <br></br>
            </h1>
            <div class="mx-auto w-50">   
                <br></br>
                <SignInButton/ >
                <br></br>
            </div>
        </body>
    );
}

export default Home;