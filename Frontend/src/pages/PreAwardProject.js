import React from 'react';
import './page.css';
import { Card, Col, Container, Row, Table, Button, ButtonGroup } from 'react-bootstrap';



function PreAwardProject(){

    return(
        <body className="lightBlue">
            <Container className='top-Padding'>
                <Row>
                    <Col>
                        <Card className="card">
                            <Card.Header className = "cardHead">
                                <Container>
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <span>Project Data</span>
                                        </Col>
                                        <Col style={{textAlign: 'right'}}>
                                            <span><Button className='Button'>Edit</Button></span>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    placeholder text
                                </Card.Text>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button'>See CLIN Data</Button>
                                    <Button className='Button'>Inport File</Button>
                                </ButtonGroup>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="card">
                            <Card.Header className = "cardHead">
                                <Container>
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <span>Project IPT</span>
                                        </Col>
                                        <Col style={{textAlign: 'right'}}>
                                            <span><Button className='Button'>Edit</Button></span>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Header>
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
                        <Card className="card no-bot-pad">
                            <Card.Header className = "cardHead">
                                <Container>
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <span>Contract Status</span>
                                        </Col>
                                        <Col style={{textAlign: 'right'}}>
                                            <span><Button className='Button'>Edit</Button></span>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Header>
                            {/*TODO: Remake table when API can retreve data*/}
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
                        <Card className="card">
                            <Card.Header className = "cardHead">
                                <Container>
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <span>Funding Data</span>
                                        </Col>
                                        <Col style={{textAlign: 'right'}}>
                                            <span><Button className='Button'>Edit</Button></span>
                                        </Col>
                                    </Row>
                                </Container> 
                                </Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row style={{fontWeight: 'bold', textAlign: 'left'}}>
                                        <Col>
                                            <span>
                                                Independent Cost Estimate:
                                            </span>
                                        </Col>
                                        <Col>
                                            <span>
                                                Projected Contract Value:
                                            </span>
                                        </Col>
                                        <Col>
                                            <div className='badge'> </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="tableTitle">
                                            Approved Funding:
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {/*TODO: Create table when API can retreve data*/}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="tableTitle">
                                            Projected Obligation Plan:
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {/*TODO: Create table when API can retreve data*/}
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </body>
    );
}

export default PreAwardProject;