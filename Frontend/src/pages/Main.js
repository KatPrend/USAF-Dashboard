import React, { useState } from 'react';
import './page.css';
import {Link} from 'react-router-dom';
import { Row, Col, Container} from 'react-bootstrap';
import { NavB } from '../components/NavB';
import { DepSum } from '../components/Summaries/DepSum';
import { FinSum } from '../components/Summaries/FinSum';
import { SchedSum } from '../components/Summaries/SchedSum';
import { ProjectContent } from '../components/Summaries/ProjectContent';

function Main() {

    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    return (
        <div className="lightBlue">
            <NavB  getUserInfo={getUserInfo}/>
            <Container className="lightblue top-Padding">
                <Row>
                    {/*1*/}
                    <Col>
                        {userid !== 0 ? <DepSum body = {<Link to="/dependency">See Dependencies</Link>} userid={userid} userRole={userRole}/> : <div className="mx-auto"> Loading...</div>}
                        <SchedSum />
                    </Col>
                    {/*2*/}
                    {userid === 0 || userRole === "Contractor" ? null :
                         <Col>
                            <FinSum />
                        </Col>
                    }
               </Row>  
            </Container>
            {userid !== 0 && userRole !== "" ? <ProjectContent userid={userid} userRole={userRole}/> : <div className="mx-auto"> Loading...</div>}
        </div>
    );
}

export default Main;    