import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
function Login() {
    return (
        <body class="lightBlue">
            <br />
            <form class="login">
                <label class="loginLabel" for="email">Email:</label>

                    <input
                        class="loginInput"
                        type="text"
                        name="email"
                        id="email"

                    />
                <br />
                <label class="loginLabel" for="password">Password:</label>
                    <input
                        class="loginInput"
                        type="password"
                        name="password"
                        id="password"
                    />

                <input
                    type="submit"
                    value="Login"   
                />
            </form>

            <br />

            <span>
                Don't have an account? 
                <Link to="/signup"> Sign up</Link>
            </span>
            <br />
            <span>Go back <Link to="/">Home</Link></span>
        </ body>
    );
}

export default Login;