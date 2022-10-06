/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Container } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";

const navStyle = { color: "white", fontSize: "48px", textDecoration: "none"};

function handleLogout(instance) {
    instance.logoutRedirect().catch(e => {
        console.error(e);
    });
}

export const NavB = () => {
    const { instance } = useMsal();

    return (
        <>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
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
                            <a href="/" className="material-icons mx-3" style={navStyle}>home</a>
                            <a href="/" className="material-icons mx-3" style={navStyle}>account_circle</a>
                            <a href="/" className="material-icons mx-3" style={navStyle}>settings</a>
                            <a href="/" onClick={() => handleLogout(instance)} className="material-icons mx-3" style={{color: "white", fontSize: "48px", textDecoration: "none", cursor: "pointer"}}>{"logout"}</a>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
