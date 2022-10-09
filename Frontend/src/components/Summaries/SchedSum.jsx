import React from "react";
import { Card, Col, Container, Row } from 'react-bootstrap';
import "./summary.css";

export const SchedSum = () => {
    return (
        <Card className='card'>
            <Card.Header className="text-center cardHead">Schedule Summary</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Container>
                        <Row>
                            <Col>
                                <div className="box green">
                                    <p className="category">Tracked Milestones on Schedule</p>
                                    <p className="value">#</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="box yellow">
                                    <p className="category">Tracked Milestones Within 5 Days</p>
                                    <p className="value">#</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="box red">
                                    <p className="category">Tracked Milestones Behind Schedule</p>
                                    <p className="value">#</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}