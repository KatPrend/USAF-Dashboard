import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div>
            <h1>Signup Page</h1>
            <span>
                Already have an account? 
                <Link to="/login"> Login</Link>
            </span>
            <br />
            <span>Go back <Link to="/">Home</Link></span>
        </div>
    );
}

export default Signup;