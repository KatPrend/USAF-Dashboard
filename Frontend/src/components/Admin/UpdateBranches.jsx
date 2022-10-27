import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import "./admin.css";

export const UpdateBranches = () => {

    // const [isLoading, setLoading] = useState(true);
    // const [data, setData] = useState();
    const [addBranch, setAddBranch] = useState("");

    // useEffect(() => {
    //     axios.get('/api/contractor/').then(response => {
    //         setData(response.data);
    //         setLoading(false);
    //     });
    // }, []);

    // if (isLoading) {
    //     return <div className="mx-auto w-100">Loading...</div>;
    // }

    let handleNewBranch = (e) => {
        setAddBranch(e.target.value);
    }

    let handleAdd = async (e) => {
        e.preventDefault();

        
    }

    let handleRemove = async () => {

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
                    <h5 style={{marginBottom:"3%"}}>Remove Branch:</h5>
                    <Col>
                        <DropdownButton style={{marginTop:"2%"}} className='dropdown' title="Branches">
                            {/* {data.map(({id, contractor_name, summary}) => (
                                <Dropdown.Item key={id} eventKey={id} onSelect={handleDropdownSelect}>
                                    {contractor_name}
                                </Dropdown.Item>
                            )) */
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