import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div>
            <h1>Login Page</h1>
            <span>
                Don't have an account? 
                <Link to="/signup"> Sign up</Link>
            </span>
            <br />
            <span>Go back <Link to="/">Home</Link></span>
        </ div>
    );
}

export default Login;