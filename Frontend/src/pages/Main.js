import React, { useState, useEffect } from 'react';
import axios from "axios";
import './page.css';
import { Card, Col, Container, Button, Row, Table } from 'react-bootstrap';
import { useMsal } from "@azure/msal-react";
/**
 * Renders information about projects assigned to the current user
 */
const ProjectContent = () => {
    const {accounts} = useMsal();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/getprojectbyuser/${accounts[0].username}`).then(response => {
            setData(response.data);
            setLoading(false);
        });

    }, []);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
        <div className="mx-auto w-75">
            <h2>Projects: <Button>Add Project</Button></h2>
            <Table striped bordered hover className="bg-light">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Contract Number</th>
                        <th>Contract Status</th>
                        <th>Org/Branch</th>
                        <th>Contract Value</th>
                        <th>Dependency Status</th>
                        <th>Financial Status</th>
                        <th>Schedule Status</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map(({ project_id, project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num }) => (
                        <tr key={project_id}>
                            <td>{project_name}</td>
                            <td>{contract_num}</td>
                            <td>{contract_status}</td>
                            <td>{branch}</td>
                            <td>Pending Contract Value</td>
                            <td>Pending Dependency Status</td>
                            <td>Pending Financial Status</td>
                            <td>Pending Schedule Status</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>        
    );
}

function Main() {

    return (
        <div className="lightBlue">
            <Container className="lightblue top-Padding">
                <Row>
                    {/*1*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Dependency Summary</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*2*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Financial Summary</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*3*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Schedule Summary</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
               </Row>
               <Row>
                    {/*1*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Future Expansion</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*2*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Future Expansion</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*3*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Future Expansion</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
               </Row>   
            </Container>
               
            <ProjectContent/>

        </div>
    );
}

export default Main;