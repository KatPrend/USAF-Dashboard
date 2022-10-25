import React, { useState, useEffect } from 'react';
import './page.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { NavB } from '../components/NavB';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Display } from '../components/Admin/Display';

function Admin() {
    const [userid, setUserid] = useState(0);

    const getUserId = (uid) => {
        setUserid(uid);
    }
    
    return (
        <div className="lightBlue">
            <NavB getUserId={getUserId}/>
            {userid == 0 ? <div className="mx-auto w-100">Loading...</div> : <Display userid={userid} />}
        </div>
    );
}

export default Admin;