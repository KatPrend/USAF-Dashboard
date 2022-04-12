import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Signup() {



    return (
        <body class="lightBlue">
            <br />
            <form class="signup">

                <p class="loginHeader">
                    <Link to="/login"> Login </Link>
                    <span class="accent">/ Create Account</span>
                </p>

                <div class="inputWrapper">

                    <label class="signupLabel" for="firstName">First Name:</label>
                    <input class="signupInput" type="text" >
                    </input>

                    <label class="signupLabel" for="lastName">Last Name:</label>
                    <input class="signupInput" type="text" >
                    </input>

                    <label class="signupLabel" for="email">Email:</label>
                    <input class="signupInput" type="text" >
                    </input>

                    <p class="passwordRequirementText">
                        Password must include:
                        <ul>
                            <li>a lowercase letter</li>
                            <li>an uppercase letter</li>
                            <li>a number</li>
                            <li>a special character</li>
                        </ul>
                    </p>

                    <label class="signupLabel" for="password">Password:</label>
                    <input class="signupInput" type="text" >
                    </input>

                    <label class="signupLabel" for="password">Confirm Password:</label>
                    <input class="signupInput" type="text" >
                    </input>

                    <input type="submit" value="Create Account">

                    </input>

                </div>
            </form>



        </body>
    );
}

export default Signup;