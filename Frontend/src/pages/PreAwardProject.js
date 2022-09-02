import React from 'react';
import './page.css';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';


function PreAwardProject(){

    return(
        <body class="lightBlue">
            <Container class="lightBlue">
                <Row>
                    <Col>
                        <Card class="card">
                            <Card.Header class = "text-center cardHead">Project Data</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    placeholder text
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card class="card">
                            <Card.Header class = "text-center cardHead">Project IPT</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    placeholder text
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Card class="card">
                            <Card.Header class = "text-center cardHead">Contract Status</Card.Header>
                            <Table striped bordered hover className="bg-light">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Requirements Planning</th>
                                        <th>Draft RFP Released</th>
                                        <th>Approved at ABC</th>
                                        <th>RFP Released</th>
                                        <th>Proposal Received</th>
                                        <th>Tech Eval Complete</th>
                                        <th>Negotiations Complete</th>
                                        <th>Awarded</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Planed</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                    </tr>
                                    <tr>
                                        <td>Actual</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                        <td>test</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Card class="card">
                            <Card.Header class = "text-center cardHead">Funding Data</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    placeholder text
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </body>
    );
}

export default PreAwardProject;