import React, { useState } from 'react';
import './page.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavB } from '../components/NavB';
import { ProjectData } from '../components/ProjectData';
import { IPT } from '../components/IPT';
import { ProjectSchedule } from '../components/ProjectSchedule';
import { ContractStatus } from '../components/Pre-Award/ContractStatus';
import { FundingData } from '../components/Pre-Award/FundingData';
import { useLocation } from 'react-router-dom';
import { AwardedModal } from '../components/Pre-Award/AwardedModal';

function PreAwardProject(){
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
            <NavB getUserInfo={getUserInfo} />
            <Container className='top-Padding'>
                <Row>
                    <Col>
                        <ProjectData data={id} userRole={userRole} />
                    </Col>

                    <Col>                      
                        <IPT data={id} userRole={userRole} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <ContractStatus data={id}/>
                    </Col>
                </Row>
                {userRole === "Contractor" ? null : <div>
                        <br />
                        <Row>
                            <Col>
                                <FundingData data={id}/>
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
            <Button className='submit-new-project preaward'>Award Project</Button>
        </div>
    );
}

export default PreAwardProject;