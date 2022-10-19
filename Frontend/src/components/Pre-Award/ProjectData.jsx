import React from 'react';
import { Button, ButtonGroup, Card, Col, Container, Row } from "react-bootstrap";
import { propTypes } from 'react-bootstrap/esm/Image';
import { Link, useHistory } from 'react-router-dom';

export const ProjectData = (props) => {
    const history = useHistory();

    const routeChange = () => {
        history.push('/clin');
    };

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
                    <Link to={{
                        pathname: '/clin',
                        state: {id:props.data}
                    }}>
                        <Button onClick={routeChange} className='Button'>See CLIN Data</Button>
                    </Link>
                    <Button className='Button'>Import File</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
}