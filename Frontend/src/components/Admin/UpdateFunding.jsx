import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import "./admin.css";

export const UpdateFunding = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [addFunding, setAddFunding] = useState("");
    const [removeFunding, setRemoveFunding] = useState();
    const [added, setAdded] = useState(false);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        axios.get('/api/fundingType/').then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    let handleNewFunding = (e) => {
        setAddFunding(e.target.value);

        setAdded(false);
        setRemoved(false);
    }

    let handleAdd = async (e) => {
        e.preventDefault();

        axios.post(`/api/fundingType/`, {
            funding_type: addFunding
        })
        .then(function(res){
            // res.data.insertId

            setAdded(true);

            axios.get('/api/fundingType/').then(response => {
                setData(response.data);
                setLoading(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    let handleDropdownSelect = (e) => {
        setRemoveFunding(e);
        setAdded(false);
        setRemoved(false);
        console.log(e);
    }

    let handleRemove = async () => {
        axios.put(`/api/fundingType/deactivate/${removeFunding}`, {
        })
        .then(function(res){

            setRemoved(true);

            axios.get('/api/fundingType/').then(response => {
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
                <Row><h4>Update Funding Types</h4></Row>
                <Row>
                    <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Add Funding Type:</h5>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Funding Type:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="contractor" placeholder='Funding Type' onChange={handleNewFunding} />
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
                    <h5 style={{marginBottom:"3%"}}>Remove Funding Type:</h5>
                    <Col>
                        <DropdownButton style={{marginTop:"2%"}} className='dropdown' title="Funding Types">
                            {data.map(({id, funding_type}) => (
                                <Dropdown.Item key={id} eventKey={id} onSelect={handleDropdownSelect}>
                                    {funding_type}
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