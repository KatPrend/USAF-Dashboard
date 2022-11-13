import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Dependencies } from '../components/Projects/Dependencies';
//import { Documents } from '../components/Awarded/Documents';
import { Funding } from '../components/Projects/Awarded/Funding';
import { IPT } from '../components/Projects/IPT';
import { ProjectData } from '../components/Projects/ProjectData';
import { ProjectSchedule } from '../components/Projects/ProjectSchedule';
import { NavB } from '../components/NavB';
import './page.css';
import { useLocation } from 'react-router-dom';

function AwardedProject(){
    const location = useLocation();
    const {id} = location.state;

    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");
    const [contractor, setContractor] = useState(0);
    const [contractorName, setContractorName] = useState("");

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    const getContractor = (cont, name) => {
        setContractor(cont);
        setContractorName(name);
    }

    return(
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo}/>

            <Container className='top-Padding'>
                <Row>
                    <Col>
                        <ProjectData data={id} userRole={userRole} getContractor={getContractor} />
                    </Col>
                    <Col>
                        {contractor === 0 ? null : <IPT data={id} 
                                                        userid={userid} 
                                                        userRole={userRole} 
                                                        contractor={contractor}
                                                        contractorName={contractorName} /> }
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

export default AwardedProject;