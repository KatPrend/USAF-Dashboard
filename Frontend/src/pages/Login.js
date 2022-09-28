import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
function Login() {
    return (
        <body className="lightBlue">
            <br />
                <form className="login">
                    <p className="loginHeader">
                        <span className="accent"> Login /</span>
                        <Link to="/signup"> Create Account </Link>
                    </p>

                    <div className="inputWrapper">
                        <label className="loginLabel w-20" for="email">Email:</label>
                            <input
                                className="loginInput w-75"
                                type="text"
                                name="email"
                                id="email"

                            />
                        <label className="loginLabel w-20" for="password">Password:</label>
                            <input
                                className="loginInput w-75"
                                type="password"
                                name="password"
                                id="password"
                            />
                        <div className="text-center">
                        <input
                            className="text-center"
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