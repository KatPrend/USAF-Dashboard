import React, { useState, useEffect } from 'react';
import './page.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { NavB } from '../components/NavB';

function Admin() {
    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }
    
    return (
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo}/>
            {userRole != "Admin" ? <div>You do not have access to this page.</div> : <>
                {userRole}
            </>}
        </div>
    );
}

export default Admin;