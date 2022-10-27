import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import "./admin.css";

export const UpdateContractors = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [contractorToRemove, setContractorToRemove] = useState();
    const [contractorToAdd, setContractorToAdd] = useState("");
    const [summary, setSummary] = useState("");

    useEffect(() => {
        axios.get('/api/contractor/').then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    let handleDropdownSelect = (e) => {
        setContractorToRemove(e);
        console.log(e);
    }

    let handleRemove = async () => {

        axios.delete(`/api/contractor/${contractorToRemove}`, {
        })
        .then(function(res){
            axios.get('/api/contractor/').then(response => {
                setData(response.data);
                setLoading(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    let handleNewContractor = (e) => {
        setContractorToAdd(e.target.value);
    }

    let handleSummary = (e) => {
        setSummary(e.target.value);
    }

    let handleAdd = async (e) => {
        e.preventDefault();

        axios.post('/api/contractor', {
            contractor_name: contractorToAdd,
            summary: summary
        })
        .then(function(res){
            // res.data.insertId

            axios.get('/api/contractor/').then(response => {
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
                <Row><h4>Update Contractors</h4></Row>
                <Row>
                    <h5 style={{marginTop:"3%"}}>Add Contractor</h5>
                    <Form>
                        <Form.Group>
                            <Form.Label>Contractor:</Form.Label>
                            <Form.Control type="contractor" placeholder='Contractor' onChange={handleNewContractor} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Summary</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter Summary" type="summary" onChange={handleSummary} />
                        </Form.Group>
                    </Form>
                    <Button className='submit-new-project admin mx-auto' onClick={handleAdd}>Submit</Button>
                </Row>
                <Row>
                    <h5>Remove Contractor</h5>
                    <Col>
                        <DropdownButton style={{marginTop:"2%"}} className='dropdown' title="Contractors">
                            {data.map(({id, contractor_name, summary}) => (
                                <Dropdown.Item key={id} eventKey={id} onSelect={handleDropdownSelect}>
                                    {contractor_name}
                                </Dropdown.Item>
                            ))
                            }
                        </DropdownButton> 
                    </Col>
                    <Col>
                        <Button className='submit-new-project admin remove' onClick={handleRemove}>Remove</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}