import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Modal, ModalBody, ButtonGroup, ModalDialog } from "react-bootstrap";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import axios from 'axios';
import "./projectData.css"

export const IPT = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        axios.get(`/api/user/iptmembers/${props.data}`).then(response =>{
            setData(response.data);
            setLoading(false);
        });
    }, []);


    if(isLoading){
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
                                <h3>Project IPT Edit</h3>
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
                            <span>Project IPT</span>
                        </Col>
                        { props.userRole === "Contractor" ? null : <Col style={{textAlign: 'right'}}>
                                <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
                            </Col>
                        }
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                {
                    data.map(({id, mil_job_title, user_name}) => (
                        <div key = {id}>
                            <p className='project-data'><span>{mil_job_title}:</span> {user_name}</p>
                        </div>
                    ))
                }
                <br></br>
            </Card.Body>
        </Card>
        </>
    );
}