import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    return (
        <body>
            <img src={require('./AirForce.jpg')} alt="Air Force logo" width="280" height="250" />
            <h1>Welcome to the USAF Project Management Dashbaord</h1>
            <ul>
                <li><button className="button"><Link to="/login" className="link">Login</Link></button></li>
                <li><button className="button"><Link to="/signup" className="link">Sign up</Link></button></li>
            </ul>
        </body>
    );
}

export default Home;