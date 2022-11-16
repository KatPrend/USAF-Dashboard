import React, { useState } from 'react';
import './page.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavB } from '../components/NavB';
import { ProjectData } from '../components/Projects/ProjectData';
import { IPT } from '../components/Projects/IPT';
import { ProjectSchedule } from '../components/Projects/ProjectSchedule';
import { ContractStatus } from '../components/Projects/Pre-Award/ContractStatus';
import { FundingData } from '../components/Projects/Pre-Award/FundingData';
import { useLocation } from 'react-router-dom';
import { Dependencies } from '../components/Projects/Dependencies';

function PreAwardProject(){
    const location = useLocation();
    const {id} = location.state;

    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");
    const [contractor, setContractor] = useState(0);
    const [contractorName, setContractorName] = useState("");
    const [reload, setReload] = useState(false);

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    const getContractor = (cont, name) => {
        setContractor(cont);
        setContractorName(name);
    }

    const getReload = (rel) => {
        console.log("reload " + rel);
        setReload(rel);
    }
    
    return(
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo} />
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
                        <Dependencies userRole={userRole} projectId={id} rel={reload} getReload={getReload} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <ContractStatus data={id} userRole={userRole}/>
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
                        <ProjectSchedule data={id} userRole={userRole} getReload={getReload} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PreAwardProject;