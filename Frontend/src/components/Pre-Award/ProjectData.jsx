import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, ButtonGroup, Card, Col, Container, Row } from "react-bootstrap";
import { propTypes } from 'react-bootstrap/esm/Image';
import { Link, useHistory } from 'react-router-dom';

export const ProjectData = (props) => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    const routeChange = () => {
        history.push('/clin');
    };

    useEffect(() => {
        axios.get(`/api/project/${props.data}`).then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

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
                    { data.project_name }
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