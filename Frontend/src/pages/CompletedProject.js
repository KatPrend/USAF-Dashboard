import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { NavB } from '../components/NavB';
import {Funding} from '../components/Projects/Completed/Funding';
import {ProjectSchedule} from '../components/Projects/Completed/ProjectSchedule';
import {IPT} from '../components/Projects/Completed/IPT';
import {ProjectData} from '../components/Projects/Completed/ProjectData';
import { useLocation } from 'react-router-dom';
import {Dependencies} from '../components/Projects/Completed/Dependencies'


function CompletedProject(){
    const location = useLocation();
    const {id} = location.state;

    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    return(
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo}/>

            <Container className='top-Padding'>
                <Row>
                    <Col>
                        <ProjectData data={id} userRole={userRole} />
                    </Col>
                    <Col>
                        <IPT data={id} userid={userid} userRole={userRole} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Dependencies userRole={userRole} projectId={id}/>
                    </Col>
                </Row>
                {userRole === "Contractor" ? null : <div>
                        <br />
                        <Row>
                            <Col>
                                <Funding projectId={id}/>
                            </Col>
                        </Row>
                    </div>
                }
                <br/>
                <Row>
                    <Col>
                        <ProjectSchedule data={id} userRole={userRole}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CompletedProject;