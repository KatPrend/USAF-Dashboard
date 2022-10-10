import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export const Funding = () => {
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
    );
}