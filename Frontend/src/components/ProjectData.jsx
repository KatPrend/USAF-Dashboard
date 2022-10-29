import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, ButtonGroup, Card, Col, Container, Row, Modal, ModalBody, ModalDialog, } from "react-bootstrap";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Link} from 'react-router-dom';
import "./projectData.css"

export const ProjectData = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    
    useEffect(() => {
        axios.get(`/api/project/${props.data}`).then(response => {

            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }


    return (
        <>
        <ModalDialog scrollable>
            <Modal show={ModalIsOpen} size='xl' autoFocus={true}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col style={{textAlign: 'left'}}>
                                <h3>Project Data Edit</h3>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button' onClick={()=>setModalIsOpen(false)}>Cancel</Button>
                                    <Button className='Button'>Save</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <Container>
                    </Container>
                </ModalBody>
            </Modal>
        </ModalDialog>


        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Project Data</span>
                        </Col>
                        { props.userRole !== "Admin" ? null : <Col style={{textAlign: 'right'}}>
                                <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
                            </Col>
                        }
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                {
                    data.map(({id,project_name, contractor_name, contract_num, contract_status, branch, requirement_type, summary}) => (
                        <div key = {id}>
                            <p className='project-data'><span>Project Name:</span> {project_name}</p>
                            <p className='project-data'><span>Contract Number:</span> {contract_num}</p>
                            <p className='project-data'><span>Contract Status:</span> {contract_status}</p>
                            <p className='project-data'><span>Contractor:</span> {contractor_name}</p>
                            <p className='project-data'><span>Branch:</span> {branch}</p>
                            <p className='project-data'><span>Requirement Type:</span> {requirement_type}</p>
                            <p className='project-data'><span>Capability Summary:</span> {summary}</p>
                        </div>
                    ))
                }
                <ButtonGroup className='CLIN-and-File-buttongroup'>
                    <Link to={{
                        pathname: '/clin',
                        state: {id:props.data}
                    }}> 
                    <Button className='Button'>See CLIN Data</Button>
                    </Link>
                </ButtonGroup>
            </Card.Body>
        </Card>
        </>
        
    );
}