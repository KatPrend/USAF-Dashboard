import React from 'react';
import { Button, ButtonGroup, Card, Col, Container, Row } from "react-bootstrap";

export const ProjectData = () => {
    return (
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
    );
}