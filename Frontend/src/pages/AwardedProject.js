import React from 'react';
import { Container, Card, Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import './page.css';

function AwardedProject(){

    return(
        <body className="lightBlue">
            <Container>
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
                            <Card.Header className = "cardHead">Project Documents</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    placeholder text
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card">
                            <Card.Header className = "cardHead">Project Schedule</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    placeholder text
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Container>
                            <Row>
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
                            <br/>
                            <Row>
                                <Col>
                                    <Card className="card">
                                        <Card.Header className = "cardHead">
                                            <Container>
                                                <Row>
                                                    <Col style={{textAlign: 'left'}}>
                                                        <span>Project Dependencies</span>
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
                        </Container>
                    </Col>
                    <Col>
                        <Card className="card">
                            <Card.Header className = "cardHead">
                                <Container>
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <span>Project Financial Managment</span>
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
                <br/>
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
                                    <Row>
                                        <Col className="tableTitle">
                                            Actual Obligation Plan:
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {/*TODO: Create table when API can retreve data*/}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="tableTitle">
                                            Projected Expenditure Plan:
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {/*TODO: Create table when API can retreve data*/}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="tableTitle">
                                            Actual Expenditure Plan:
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
    )
}

export default AwardedProject;