import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import "./admin.css";

export const UpdateUsers = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userRole, setUserRole] = useState(1);
    const [title, setUserTitle] = useState();

    useEffect(() => {
        axios.get('/api/user/').then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    let handleName = (e) => {
        setUserName(e.target.value);
    }

    let handleEmail = (e) => {
        setEmail(e.target.value);
    }

    let handleRole = (e) => {
        setUserRole(e.target.value);
    }

    let handleTitle = (e) => {
        setUserTitle(e.target.value);
    }

    let handleAdd = async (e) => {
        e.preventDefault();

        
    }

    let handleRemove = async () => {

    }

    return (
        <div>
            <Container>
                <Row><h4>Update Users</h4></Row>
                <Row>
                    <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Add User:</h5>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Name:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="username" placeholder='First and Last Name' onChange={handleName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Email:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="useremail" placeholder='Email' onChange={handleEmail} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Role:</Form.Label>
                            <Col sm={7}>
                                <Form.Control as="select" show={true} type="userrole" placeholder='Role' onChange={handleRole}>
                                    <option value="1">Contractor</option>
                                    <option value="2">IPT Member</option>
                                    <option value="3">Admin</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {userRole === 2 ? 
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>Military Job Title:</Form.Label>
                                <Col sm={7}>
                                    <Form.Control as="select" show={true} type="jobtitle" placeholder='title' onChange={handleTitle}>
                                        <option value="1">Project Manager</option>
                                        <option value="2">Primary Engineer</option>
                                        <option value="3">Primary Logistics</option>
                                        <option value="3">GFE/GFP POC</option>
                                        <option value="3">Contracting</option>
                                        <option value="3">Financial Analyst</option>
                                        <option value="3">Cost Analyst</option>
                                        <option value="3">Reviewing Supervisor/PM</option>
                                        <option value="3">Secondary Engineer</option>
                                        <option value="3">Det 3</option>
                                        <option value="3">Configuration/Data Management</option>
                                        <option value="3">IPMR/IMS</option>
                                        <option value="3">Cybersecurity</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        : null}
                    </Form>
                    <Button className='submit-new-project admin mx-auto' onClick={handleAdd}>Submit</Button>
                </Row>
            </Container>
        </div>
    );
}