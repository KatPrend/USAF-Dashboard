import React from "react";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';


export const FundingData = () => {
    return (
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
    );
}