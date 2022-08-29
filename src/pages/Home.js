import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    return (
        <body>
            <img class="center" src={require('./AirForce.jpg')} alt="Air Force logo" width="280" height="250"/>
            <h1 class="text-center">Welcome to the USAF Project Management Dashbaord</h1>
            <div class="mx-auto w-50">   
            <Link to="/login" className="link"><button className="button w-100">Login</button></Link>
            
            <Link to="/signup" className="link"><button className="button w-100">Sign up</button></Link>
            </div>
        </body>
    );
}

export default Home;