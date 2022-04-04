import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
function Login() {
    return (
        <body class="lightBlue">
            <br />
                <form class="login">
                    <p class="loginHeader">Login<span class="accent">/Create account</span></p>
                    <div class="inputWrapper">
                        <label class="loginLabel" for="email">Email:</label>

                            <input
                                class="loginInput"
                                type="text"
                                name="email"
                                id="email"

                            />
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
                    </div>
                    <p>
                        Don't have an account? <Link to="/signup"> Sign up</Link> 
                        <br />
                        Go back <Link to="/">Home</Link>
                    </p>                
                </form>



        </body>

    );
}

export default Login;