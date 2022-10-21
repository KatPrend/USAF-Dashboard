import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

export const IPT = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/user/iptmembers/${props.data}`).then(response =>{
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if(isLoading){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
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
                {
                    data.map(({id, mil_job_title, userName}) => (
                        <div key ={id}>
                            <p>{mil_job_title}: {userName}</p>
                        </div>
                    ))
                }
            </Card.Body>
        </Card>
    );
}