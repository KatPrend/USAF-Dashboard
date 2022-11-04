import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import "./admin.css";

export const UpdateTitles = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [addTitle, setAddTitle] = useState("");
    const [removeTitle, setRemoveTitle] = useState();
    const [added, setAdded] = useState(false);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        axios.get('/api/mjt/milJobs/notInUse/').then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    let handleNewTitle = (e) => {
        setAddTitle(e.target.value);
        setAdded(false);
        setRemoved(false);
    }

    let handleAdd = async (e) => {
        e.preventDefault();

        axios.post(`/api/mjt/newMilJob/${addTitle}`, {
        })
        .then(function(res){
            // res.data.insertId

            setAdded(true);

            axios.get('/api/mjt/milJobs/notInUse/').then(response => {
                setData(response.data);
                setLoading(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    let handleDropdownSelect = (e) => {
        setRemoveTitle(e);
        setAdded(false);
        setRemoved(false);
        console.log(e);
    }

    let handleRemove = async () => {
        axios.delete(`/api/mjt/removeMilJob/${removeTitle}`, {
        })
        .then(function(res){

            setRemoved(true);

            axios.get('/api/mjt/milJobs/notInUse/').then(response => {
                setData(response.data);
                setLoading(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    return (
        <div>
            <Container>
                <Row><h4>Update Branches</h4></Row>
                <Row>
                    <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Add Military Job Title:</h5>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Branch:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="contractor" placeholder='Military Job Title' onChange={handleNewTitle} />
                            </Col>
                        </Form.Group>
                    </Form>
                    <Button className='submit-new-project admin mx-auto' onClick={handleAdd}>Submit</Button>
                </Row>
                <Row>
                    <Col>
                        {added ? <div style={{marginBottom:"5%"}}>Successfully added.</div> : null}
                    </Col>
                </Row>
                <Row>
                    <h5 style={{marginBottom:"3%"}}>Remove Military Job Title:</h5>
                    <Col>
                        <DropdownButton style={{marginTop:"2%"}} className='dropdown' title="Job Titles">
                            {data.map(({id, mil_job_title}) => (
                                <Dropdown.Item key={id} eventKey={id} onSelect={handleDropdownSelect}>
                                    {mil_job_title}
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