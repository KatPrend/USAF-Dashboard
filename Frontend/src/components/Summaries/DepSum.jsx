import React from "react";
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const DepSum = () => {
    return (
        <Card className='card'>
            <Card.Header className="text-center cardHead">Dependency Summary</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <div className="box green">
                                <p className="category">Tracked Dependencies With {">5"} Days Schedule Margin</p>
                                <p className="value">2</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="box yellow">
                                <p className="category">Tracked Dependencies With {"<5"} Days Schedule Margin</p>
                                <p className="value">2</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="box red">
                                <p className="category">Tracked Dependencies With Tracked Impacts</p>
                                <p className="value">3</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Link to="/dependency">See Dependencies</Link>
            </Card.Body>
        </Card>
    );
}