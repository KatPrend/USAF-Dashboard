import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
function Login() {
    return (
        <body class="lightBlue">
            <br />
                <form class="login">
                    <p class="loginHeader">
                        <span class="accent"> Login /</span>
                        <Link to="/signup"> Create Account </Link>
                    </p>

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
                        Go back <Link to="/">Home</Link>
                    </p>  
                                  
                </form>



        </body>

    );
}

export default Login;