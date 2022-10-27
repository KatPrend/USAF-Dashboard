/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios";
import { Link } from 'react-router-dom';

import { Container, Tooltip } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import "./navB.css";

const navStyle = { color: "white", fontSize: "48px", textDecoration: "none"};

function handleLogout(instance) {
    instance.logoutRedirect().catch(e => {
        console.error(e);
    });
}

export const NavB = ({getUserInfo}) => {
    const { accounts, instance } = useMsal();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/user/userEmail/${accounts[0].username}`).then(response => {
            setData(response.data);
            setLoading(false);

            getUserInfo(response.data[0].id, response.data[0].user_role);
        });
    }, []);

    console.log(data);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

            <Navbar className="whole-bar" bg="primary" variant="dark" style={{height: 'auto'}}>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                        alt=""
                        src={require('../images/AirForceLogoWhite.png')}
                        width="60"
                        height="50"
                        className="d-inline-block align-middle"
                        />{' '}
                        Metis
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {data[0].user_role === "Admin" ? 
                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Admin Page</Tooltip>}>
                                    <Link to="/admin" style={navStyle} className="material-icons mx-3">edit_square</Link>
                                </OverlayTrigger>
                                : null
                            }
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Home</Tooltip>}>
                                <a href="/" className="material-icons mx-3" style={navStyle}>home</a>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Sign Out</Tooltip>}>
                                <a href="/" onClick={() => handleLogout(instance)} className="material-icons mx-3" style={{color: "white", fontSize: "48px", textDecoration: "none", cursor: "pointer"}}>{"logout"}</a>
                            </OverlayTrigger>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
