import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row} from "react-bootstrap";
import axios from 'axios';
import "./projectData.css"

export const IPT = (props) => {
    const [isLoading1, setLoading1] = useState(true);
    const [ipt, setIpt] = useState();
    

    useEffect(() => {
        axios.get(`/api/user/iptmembers/${props.data}`).then(response =>{
            setIpt(response.data);
            setLoading1(false);
        });
    }, []);


    if(isLoading1){
        return <div className="mx-auto w-75">Loading...</div>;
    }


    return (
        <>
        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Project IPT</span>
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                {
                    ipt.map(({id, mil_job_title, user_name}) => (
                        <div key = {id}>
                            <p className='project-data'><span>{mil_job_title}:</span> {user_name}</p>
                        </div>
                    ))
                }
                <br></br>
            </Card.Body>
        </Card>
        </>
    );
}