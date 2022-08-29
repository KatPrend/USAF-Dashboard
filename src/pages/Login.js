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
                        <label class="loginLabel w-20" for="email">Email:</label>

                            <input
                                class="loginInput w-75"
                                type="text"
                                name="email"
                                id="email"

                            />
                        <label class="loginLabel w-20" for="password">Password:</label>
                            <input
                                class="loginInput w-75"
                                type="password"
                                name="password"
                                id="password"
                            />
                        <div class="text-center">
                        <input
                            class="text-center"
                            type="submit"
                            value="Login"   
                        />
                        </div>
                    </div>

                    <p>
                        Go back <Link to="/">Home</Link>
                    </p>  
                    {/* Rember to remove the below link to the main page!!!! */}
                    <p>
                        SHORTCUT TO  <Link to="/main">Main</Link>
                    </p>
                                  
                </form>



        </body>

    );
}

export default Login;