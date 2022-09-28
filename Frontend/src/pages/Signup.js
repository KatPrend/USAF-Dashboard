import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Signup() {



    return (
        <body className="lightBlue">
            <br />
            <form className="signup">

                <p className="loginHeader">
                    <Link to="/login"> Login </Link>
                    <span className="accent">/ Create Account</span>
                </p>

                <div className="inputWrapper">

                    <label className="signupLabel" for="firstName">First Name:</label>
                    <input className="signupInput" type="text" >
                    </input>

                    <label className="signupLabel" for="lastName">Last Name:</label>
                    <input className="signupInput" type="text" >
                    </input>

                    <label className="signupLabel" for="email">Email:</label>
                    <input className="signupInput" type="text" >
                    </input>

                    <p className="passwordRequirementText">
                        Password must include:
                        <ul>
                            <li>a lowercase letter</li>
                            <li>an uppercase letter</li>
                            <li>a number</li>
                            <li>a special character</li>
                        </ul>
                    </p>

                    <label className="signupLabel" for="password">Password:</label>
                    <input className="signupInput" type="password" >
                    </input>

                    <label className="signupLabel" for="password">Confirm Password:</label>
                    <input className="signupInput" type="password" >
                    </input>
                    <div className="text-center">
                        <input type="submit" value="Create Account">
                        </input>
                    </div>

                </div>

                <p>
                    Go back <Link to="/">Home</Link>
                </p>

            </form>



        </body>
    );
}

export default Signup;