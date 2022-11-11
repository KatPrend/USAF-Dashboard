import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Card, Col, Container, Row } from 'react-bootstrap';

export const DepSum = (props) => {
    const [isLoadingRed, setLoadingRed] = useState(true);
    const [isLoadingYellow, setLoadingYellow] = useState(true);
    const [isLoadingGreen, setLoadingGreen] = useState(true);
    const [red, setRed] = useState();
    const [yellow, setYellow] = useState();
    const [green, setGreen] = useState();

    useEffect(() => {
        if(props.userRole === "Admin"){
            axios.get(`/api/dependency/redAdmin`).then(response => {
                setRed(response.data);
                setLoadingRed(false);
            });

            axios.get(`/api/dependency/yellowAdmin`).then(response => {
                setYellow(response.data);
                setLoadingYellow(false);
            });

            axios.get(`/api/dependency/greenAdmin`).then(response => {
                setGreen(response.data);
                setLoadingGreen(false);
            });
        } 
        else {
            axios.get(`/api/dependency/redUserDependencies/${props.userid}`).then(response => {
                setRed(response.data);
                setLoadingRed(false);
            });

            axios.get(`/api/dependency/yellowUserDependencies/${props.userid}`).then(response => {
                setYellow(response.data);
                setLoadingYellow(false);
            });

            axios.get(`/api/dependency/greenUserDependencies/${props.userid}`).then(response => {
                setGreen(response.data);
                setLoadingGreen(false);
            });
        }
    }, []);


    if (isLoadingRed || isLoadingYellow || isLoadingGreen) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    return (
        <Card className='card'>
            <Card.Header className="text-center cardHead">Dependency Summary</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <div className="box green">
                                <p className="category">Tracked Dependencies With {">5"} Days Schedule Margin</p>
                                <p className="value">{green[0].count}</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="box yellow">
                                <p className="category">Tracked Dependencies With {"<5"} Days Schedule Margin</p>
                                <p className="value">{yellow[0].count}</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="box red">
                                <p className="category">Tracked Dependencies With Tracked Impacts</p>
                                <p className="value">{red[0].count}</p>
                            </div>
                        </Col>
                    </Row>
                    {props.body}
                </Container>
            </Card.Body>
        </Card>
    );
}