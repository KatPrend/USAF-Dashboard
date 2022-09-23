import React from 'react';
import './page.css';
import { Card, Col, Container, Button, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

function Main() {
    return (
        <body class="lightBlue">
            <Container class="lightblue">
                <Row>
                    {/*1*/}
                    <Col>
                        <Card class='card'>
                            <Card.Header class="text-center cardHead">Dependency Summary</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*2*/}
                    <Col>
                        <Card class='card'>
                            <Card.Header class="text-center cardHead">Financial Summary</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*3*/}
                    <Col>
                        <Card class='card'>
                            <Card.Header class="text-center cardHead">Schedule Summary</Card.Header>
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
                        <Card class='card'>
                            <Card.Header class="text-center cardHead">Future Expansion</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*2*/}
                    <Col>
                        <Card class='card'>
                            <Card.Header class="text-center cardHead">Future Expansion</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*3*/}
                    <Col>
                        <Card class='card'>
                            <Card.Header class="text-center cardHead">Future Expansion</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
               </Row>
            </Container>
            <div class="mx-auto w-75">
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
                        <tr>
                            <td>design a box</td>
                            <td>FA8620-AA-1111</td>
                            <td>Completed</td>
                            <td>Modernization</td>
                            <td>$5,021,921</td>
                            <td>▲</td>
                            <td>■</td>
                            <td>⬤</td>
                        </tr>
                        <tr>
                            <td>design a box</td>
                            <td>FA8620-AA-1111</td>
                            <td>Completed</td>
                            <td>Modernization</td>
                            <td>$5,021,921</td>
                            <td>▲</td>
                            <td>■</td>
                            <td>⬤</td>
                        </tr>
                        <tr>
                            <td>design a box</td>
                            <td>FA8620-AA-1111</td>
                            <td>Completed</td>
                            <td>Modernization</td>
                            <td>$5,021,921</td>
                            <td>▲</td>
                            <td>■</td>
                            <td>⬤</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </body>
    );

    
    
}

export default Main;