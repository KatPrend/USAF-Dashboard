import React from "react";
import { Card, Col, Container, Row } from 'react-bootstrap';


export const FinSum = () => {
    return (
        <Card className='card'>
            <Card.Header className="text-center cardHead">Financial Summary</Card.Header>
            <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <div className="obligation">
                                    <div className="finTitle">Obligation Status to Date</div>
                                    <div>{"<Insert Graph Here>"}</div>
                                    <br />
                                    <div className="finInfo">Planned Obligation: {"$8,000,000"}</div>
                                    <div className="finInfo">Actual Obligation: {"$8,000,000"}</div>
                                </div>
                            </Col>
                            <Col>
                                <div className="expenditure">
                                    <p className="finTitle">Expenditure Status to Date</p>
                                    <div>{"<Insert Graph Here>"}</div>
                                    <br />
                                    <p className="finInfo">Planned Expenditure: {"$8,000,000"}</p>
                                    <p className="finInfo">Actual Expenditure: {"$8,000,000"}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
            </Card.Body>
        </Card>
    );
}