import React, { useState, useEffect } from 'react';
import './page.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { NavB } from '../components/NavB';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';

function Admin() {
    return (
        <div className="lightBlue">
            <NavB />
        </div>
    );
}

export default Admin;