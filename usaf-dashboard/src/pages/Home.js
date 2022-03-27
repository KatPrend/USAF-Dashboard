import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    return (
        <body>
            <img class="center" src={require('./AirForce.jpg')} alt="Air Force logo" width="280" height="250"/>
            <h1>Welcome to the USAF Project Management Dashbaord</h1>
                
            <Link to="/login" className="link"><button className="button">Login</button></Link>
            <br></br>
            <Link to="/signup" className="link"><button className="button">Sign up</button></Link>
        </body>
    );
}

export default Home;