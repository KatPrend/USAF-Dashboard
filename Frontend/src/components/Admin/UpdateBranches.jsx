import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import "./admin.css";

export const UpdateBranches = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [addBranch, setAddBranch] = useState("");
    const [removeBranch, setRemoveBranch] = useState(0);
    const [added, setAdded] = useState(false);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        axios.get('/api/branch/noproject').then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    let handleNewBranch = (e) => {
        setAddBranch(e.target.value);
        setAdded(false);
        setRemoved(false);
    }

    let handleAdd = async (e) => {
        e.preventDefault();

        axios.post(`/api/branch/`, {
            branch_name: addBranch
        })
        .then(function(res){
            // res.data.insertId

            setAdded(true);

            axios.get('/api/branch/noproject').then(response => {
                setData(response.data);
                setLoading(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    let handleDropdownSelect = (e) => {
        setRemoveBranch(e.target.value);
        setAdded(false);
        setRemoved(false);
        console.log(e.target.value);
    }

    let handleRemove = async () => {
        axios.delete(`/api/branch/${removeBranch}`, {
        })
        .then(function(res){

            setRemoved(true);

            axios.get('/api/branch/noproject').then(response => {
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
                    <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Add Branch:</h5>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Branch:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="contractor" placeholder='Branch' onChange={handleNewBranch} />
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
                    <h5 style={{marginBottom:"3%"}}>Remove Branch:</h5>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}></Form.Label>
                        <Col sm={4}>
                            <Form.Control as="select" onChange={handleDropdownSelect}>
                                <option key={0} value={0}>Select Branch</option>
                                {data.map((element, index) => (
                                    <option key={index} value={element.id}>
                                        {element.branch_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                        <Col sm={4}>
                            <Button className='submit-new-project admin remove' onClick={handleRemove}>Remove</Button>
                        </Col>
                    </Form.Group>
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