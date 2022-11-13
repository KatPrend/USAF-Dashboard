import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import "./admin.css";

export const UpdateUsers = () => {

    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [isLoading3, setLoading3] = useState(true);
    const [titles, setTitles] = useState();
    const [users, setUsers] = useState();
    const [contractors, setContractors] = useState();
    const [removeUser, setRemoveUser] = useState(1);

    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");

    const [IPTName, setIPTName] = useState("");
    const [IPTEmail, setIPTEmail] = useState("");

    const [contractorName, setContractorName] = useState("");
    const [contractorEmail, setContractorEmail] = useState("");
    const [contractor, setContractor] = useState(1);

    const [addedAdmin, setAddedAdmin] = useState(false);
    const [addedIPT, setAddedIPT] = useState(false);
    const [addedContractor, setAddedContractor] = useState(false);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        axios.get('/api/mjt/milJobs/').then(response => {
            setTitles(response.data);
            setLoading1(false);
        });

        axios.get('/api/user/').then(response => {
            setUsers(response.data);
            setLoading2(false);
        });

        axios.get('/api/contractor/').then(response => {
            setContractors(response.data);
            setLoading3(false);
        });
    }, []);

    if (isLoading1 || isLoading2 || isLoading3) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    let handleAdminName = (e) => {
        setAdminName(e.target.value);

        setAddedAdmin(false);
        setAddedIPT(false);
        setAddedContractor(false);
        setRemoved(false);
    }
    let handleAdminEmail = (e) => {
        setAdminEmail(e.target.value);

        setAddedAdmin(false);
        setAddedIPT(false);
        setAddedContractor(false);
        setRemoved(false);
    }
    let handleAddAdmin = async (e) => {
        e.preventDefault();

        axios.post('/api/user/', {
            contractor_id: '1',
            user_name: adminName,
            user_role: 'Admin',
            user_email: adminEmail
        })
        .then(function(res){
            //console.log(res);
            setAddedAdmin(true);

            axios.get('/api/user/').then(response => {
                setUsers(response.data);
                setLoading2(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    let handleIPTName = (e) => {
        setIPTName(e.target.value);

        setAddedAdmin(false);
        setAddedIPT(false);
        setAddedContractor(false);
        setRemoved(false);
    }
    let hanldeIPTEmail = (e) => {
        setIPTEmail(e.target.value);

        setAddedAdmin(false);
        setAddedIPT(false);
        setAddedContractor(false);
        setRemoved(false);
    }
    let handleAddIPT = async (e) => {
        e.preventDefault();

        console.log("Name: " + IPTName);
        console.log("Email: " + IPTEmail);

        axios.post('/api/user/', {
            contractor_id: '1',
            user_name: IPTName,
            user_role: 'IPT Member',
            user_email: IPTEmail
        })
        .then(function(res){
            //console.log(res);
            setAddedIPT(true);

            axios.get('/api/user/').then(response => {
                setUsers(response.data);
                setLoading2(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    let handleContractorName = (e) => {
        setContractorName(e.target.value);

        setAddedAdmin(false);
        setAddedIPT(false);
        setAddedContractor(false);
        setRemoved(false);
    }
    let handleContractorEmail = (e) => {
        setContractorEmail(e.target.value);

        setAddedAdmin(false);
        setAddedIPT(false);
        setAddedContractor(false);
        setRemoved(false);
    }
    let handleContractor = (e) => {
        setContractor(e.target.value);

        setAddedAdmin(false);
        setAddedIPT(false);
        setAddedContractor(false);
        setRemoved(false);
    }
    let handleAddContractor = async (e) => {
        e.preventDefault();

        axios.post('/api/user/newContractor', {
            contractor_id: contractor,
            user_name: contractorName,
            user_email: contractorEmail
        })
        .then(function(res){
            //console.log(res);
            setAddedContractor(true);

            axios.get('/api/user/').then(response => {
                setUsers(response.data);
                setLoading2(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    let handleDropdownSelect = (e) => {
        setRemoveUser(e);
        setAddedAdmin(false);
        setAddedIPT(false);
        setAddedContractor(false);
        setRemoved(false);
        console.log(e);
    }
    let handleRemove = async () => {

        axios.delete(`/api/user/del/${removeUser}`, {
        })
        .then(function(res){

            setRemoved(true);

            axios.get('/api/user/').then(response => {
                setUsers(response.data);
                setLoading2(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    return (
        <div>
            <Container>
                <Row><h4>Update Users</h4></Row>
                <Row>
                    <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Add Admin:</h5>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Name:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="username" placeholder='First and Last Name' onChange={handleAdminName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Email:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="useremail" placeholder='Email' onChange={handleAdminEmail} />
                            </Col>
                        </Form.Group>
                    </Form>
                    <Button className='submit-new-project admin mx-auto' onClick={handleAddAdmin}>Submit</Button>
                </Row>
                <Row>
                    <Col>
                        {addedAdmin ? <div style={{marginBottom:"5%"}}>Successfully added.</div> : null}
                    </Col>
                </Row>
                <Row>
                    <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Add IPT:</h5>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Name:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="username" placeholder='First and Last Name' onChange={handleIPTName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Email:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="useremail" placeholder='Email' onChange={hanldeIPTEmail} />
                            </Col>
                        </Form.Group>
                    </Form>
                    <Button className='submit-new-project admin mx-auto' onClick={handleAddIPT}>Submit</Button>
                </Row>
                <Row>
                    <Col>
                        {addedIPT ? <div style={{marginBottom:"5%"}}>Successfully added.</div> : null}
                    </Col>
                </Row>
                <Row>
                    <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Add Contractor:</h5>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Name:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="username" placeholder='First and Last Name' onChange={handleContractorName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Email:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="useremail" placeholder='Email' onChange={handleContractorEmail} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Contractor:</Form.Label>
                            <Col sm={7}>
                                <Form.Control as="select" show={true} type="contractor" placeholder='Contractor' onChange={handleContractor}>
                                    {contractors.map(({id, contractor_name, summary}) => (
                                        <option value={id} key={id} eventKey={id}>{contractor_name}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Form>
                    <Button className='submit-new-project admin mx-auto' onClick={handleAddContractor}>Submit</Button>
                </Row>
                <Row>
                    <Col>
                        {addedContractor ? <div style={{marginBottom:"5%"}}>Successfully added.</div> : null}
                    </Col>
                </Row>
                <Row>
                    <h5>Remove User</h5>
                    <Col>
                        <DropdownButton style={{marginTop:"2%"}} className='dropdown' title="Users">
                            {users.map(({id, contractor_id, user_name, user_role, user_email, mil_job_title_id}) => (
                                <Dropdown.Item key={id} eventKey={id} onSelect={handleDropdownSelect}>
                                    {user_name}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton> 
                    </Col>
                    <Col>
                        <Button className='submit-new-project admin remove' onClick={handleRemove}>Remove</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {removed ? <div>Successfully Removed.</div> : null}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}