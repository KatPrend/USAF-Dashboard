import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export const Dependencies = () => {
    return (
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
    );
}