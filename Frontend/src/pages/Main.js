import React, { useState, useEffect } from 'react';
import axios from "axios";
import './page.css';
import {Link} from 'react-router-dom';
import { Col, Container, Button, Row, Table, Form } from 'react-bootstrap';
import { NavB } from '../components/NavB';
import { DepSum } from '../components/Summaries/DepSum';
import { FinSum } from '../components/Summaries/FinSum';
import { SchedSum } from '../components/Summaries/SchedSum';
import { ProjectContent } from '../components/Summaries/ProjectContent';

function Main() {

    const [userid, setUserid] = useState(0);

    const getUserId = (uid) => {
        setUserid(uid);
    }

    return (
        <div className="lightBlue">
            <NavB  getUserId={getUserId}/>
            <Container className="lightblue top-Padding">
                <Row>
                    {/*1*/}
                    <Col>
                        <DepSum body = {<Link to="/dependency">See Dependencies</Link>}/>
                    </Col>
                    {/*2*/}
                    <Col>
                        <FinSum />
                    </Col>
                    {/*3*/}
                    <Col>
                        <SchedSum />
                    </Col>
               </Row>  
               <Row>
                    {userid != 0 ? <ProjectContent userid={userid}/> : <div className="mx-auto w-100">Loading...</div>}
               </Row>
            </Container>
            <br />
        </div>
    );
}

export default Main;    