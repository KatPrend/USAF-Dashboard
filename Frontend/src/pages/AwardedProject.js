import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Button, Modal, ModalBody } from 'react-bootstrap';
import { Dependencies } from '../components/Projects/Dependencies';
//import { Documents } from '../components/Awarded/Documents';
import { Funding } from '../components/Projects/Awarded/Funding';
import { IPT } from '../components/Projects/IPT';
import { ProjectData } from '../components/Projects/ProjectData';
import { ProjectSchedule } from '../components/Projects/ProjectSchedule';
import { NavB } from '../components/NavB';
import './page.css';
import { Link, useLocation } from 'react-router-dom';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import axios from 'axios';

function AwardedProject(){
    const location = useLocation();
    const {id} = location.state;

    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [contractId, setContractId] = useState();
    const [loading, setLoading] = useState(true);
    const [contractor, setContractor] = useState(0);
    const [contractorName, setContractorName] = useState("");

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    useEffect(()=>{
        axios.get(`api/contract/contractAward/${id}`).then(response => {
            console.log(JSON.stringify(response.data));
            setContractId(response.data[0].id);
            setLoading(false);
        });
    })

    let handelCompleteProject = () => {
        axios.put(`/api/contract/status/${contractId}`, {
            id: contractId,
            contract_status: 'Closed'
        })
    }

    if(loading){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    const getContractor = (cont, name) => {
        setContractor(cont);
        setContractorName(name);
    }

    return(
        <>
        <Modal show={modalIsOpen} size='xl' autoFocus={true}>
            <ModalHeader>
                <h4>
                    Are you sure you want to close this project, once a project is closed it cannot be edited
                </h4>
            </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            <Button className='Button' onClick={()=>setModalIsOpen(false)}>Cancel</Button>
                        </Col>
                        <Col>
                            <Link to={{pathname: "/completedproject", state: {id:id}}} onClick={handelCompleteProject}><Button className='Button'>Complete Project</Button></Link>
                            
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
        </Modal>

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
                {userRole !== "Admin" ? null : <div>
                    <Row>
                        <Col>
                            <Button className='submit-new-project preaward' onClick={()=>setModalIsOpen(true)}>Close Project</Button>
                        </Col>
                    </Row>
                </div>}
                
            </Container>
        </div>
        </>
        
    );
}

export default AwardedProject;