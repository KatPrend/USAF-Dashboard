import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Dependencies } from '../components/Awarded/Dependencies';
import { Documents } from '../components/Awarded/Documents';
import { Funding } from '../components/Awarded/Funding';
import { IPT } from '../components/IPT';
import { ProjectData } from '../components/ProjectData';
import { ProjectSchedule } from '../components/ProjectSchedule';
import { NavB } from '../components/NavB';
import './page.css';
import { useLocation } from 'react-router-dom';



//Move this ish to the component

function AwardedProject(){
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
                        <IPT data={id} userRole={userRole} />
                    </Col>
                    <Col>
                        <Dependencies />
                    </Col>
                </Row>
                {userRole === "Contractor" ? null : <div>
                        <br />
                        <Row>
                            <Col>
                                <Funding data={id}/>
                            </Col>
                        </Row>
                    </div>
                }
                <br/>
                <Row>
                    <Col>
                        <ProjectSchedule data={id}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AwardedProject;