/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useIsAuthenticated } from "@azure/msal-react";
import { Container } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";


/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props 
 */
const navStyle = { color: "white", fontSize: "48px", textDecoration: "none"};



export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/"
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    }
    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
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
                            <a href="/" onClick={() => (isAuthenticated ? handleLogout("redirect") : handleLogin("redirect"))} className="material-icons mx-3" style={{color: "white", fontSize: "48px", textDecoration: "none", cursor: "pointer"}}>{isAuthenticated ? "logout" : "login"}</a>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
            {props.children}
        </>
    );
};
