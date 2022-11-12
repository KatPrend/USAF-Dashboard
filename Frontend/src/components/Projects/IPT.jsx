import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Modal, ModalBody, ButtonGroup, ModalDialog, Form } from "react-bootstrap";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import axios from 'axios';
import "./projectData.css"

export const IPT = (props) => {
    const [isLoading1, setLoading1] = useState(true);
    const [ipt, setIpt] = useState();
    const [isLoading2, setLoading2] = useState(true);
    const [titles, setTitles] = useState();
    const [isLoading3, setLoading3] = useState(true);
    const [users, setUsers] = useState()
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    // IPT Users
    const [addUsername, setAddUsername] = useState(1);
    const [addUsertitle, setAddUsertitle] = useState(1);
    const [removeUser, setRemoveUser] = useState(0);
    // Contractors
    const [allContractors, setAllContractors] = useState();
    //const [isLoading4, setLoading4] = useState(true);
    const [projectCont, setProjectCont] = useState();
    //const [isLoading5, setLoading5] = useState(true);
    const [addCont, setAddCont] = useState(0);
    const [addContName, setAddContName] = useState("");
    const [removeCont, setRemoveCont] = useState(0);
    const [addedCont, setAddedCont] = useState(false);
    const [removedCont, setRemovedCont] = useState(false);

    useEffect(() => {
        axios.get(`/api/user/iptmembers/${props.data}`).then(response =>{
            setIpt(response.data);
            setLoading1(false);
        });
    }, []);

    useEffect(() => {
        axios.get(`/api/mjt/milJobs/`).then(response =>{
            setTitles(response.data);
            setLoading2(false);
        });
    }, []);

    useEffect(() => {
        axios.get(`/api/user/`).then(response =>{
            setUsers(response.data);
            setLoading3(false);
        });
    }, []);

    if(isLoading1 || isLoading2 || isLoading3) { // || isLoading4 || isLoading5){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    let handleUsername = (e) => {
        setAddUsername(e.target.value);
    }
    let handleUserTitle = (e) => {
        setAddUsertitle(e.target.value);
    }
    let handleRemoveUser = (e) => {
        setRemoveUser(e.target.value);
    }

    let handleAdd = async (e) => {
        e.preventDefault();

        console.log(props.data);
        console.log(addUsername);
        console.log(addUsertitle);

        axios.post('/api/user/addToUPL', {
            user_id: addUsername,
            project_id: props.data,
            mil_job_title_id: addUsertitle
        })
        .then(function(res){
            //console.log(res);

            axios.get(`/api/user/iptmembers/${props.data}`).then(response =>{
                setIpt(response.data);
                setLoading1(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    };

    let handleRemove = async () => {
        console.log("Remove " + removeUser);
        console.log("project id: " + props.data);

        if (removeUser !== 0) {
            axios.delete(`/api/user/removeUPL/${removeUser}/${props.data}`, {
            })
            .then(function(res){
                axios.get(`/api/user/iptmembers/${props.data}`).then(response =>{
                    setIpt(response.data);
                    setLoading1(false);
                });
                
                setRemoveUser(0);
            })
            .catch(function (err){
                console.log(err);
            });
        }
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
                                    <Button className='Button' onClick={()=>setModalIsOpen(false)}>Done</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col>
                                <h4 style={{marginBottom:"4%"}}>Add IPT Member</h4>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Job Title:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as="select" columns sm="auto" onChange={handleUserTitle}>
                                            {
                                                titles.map(({id, mil_job_title}) => (
                                                    <option value={id} key={id} eventKey={id}>{mil_job_title}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={3}>User:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as="select" columns sm="auto" onChange={handleUsername}>
                                            {
                                                users.map(({id, user_name}) => (
                                                    <option value={id} key={id} eventKey={id}>{user_name}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Button style={{marginTop:"4%"}} className='submit-new-project' onClick={handleAdd}>Add</Button>
                            </Col>
                            <Col>
                                <h4 style={{marginBottom:"4%"}}>Remove IPT Member</h4>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={3}>User:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as="select" columns sm="auto" onChange={handleRemoveUser}>
                                            <option value={0} key={0} eventKey={0}>Choose IPT Member</option>
                                            {
                                                ipt.map(({id, user_name}) => (
                                                    <option value={id} key={id} eventKey={id}>{user_name}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Button style={{marginTop:"4%"}} className='submit-new-project' onClick={handleRemove}>Remove</Button>
                            </Col>
                        </Row>
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
                    ipt.map(({id, mil_job_title, user_name}) => (
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