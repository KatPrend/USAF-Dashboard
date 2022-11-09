import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Card, Col, Container, Row } from 'react-bootstrap';
import "./summary.css";

export const SchedSum = (props) => {
    const [isLoadingRed, setLoadingRed] = useState(true);
    const [isLoadingYellow, setLoadingYellow] = useState(true);
    const [isLoadingGreen, setLoadingGreen] = useState(true);
    const [red, setRed] = useState();
    const [yellow, setYellow] = useState();
    const [green, setGreen] = useState();

    useEffect(() => {
        if(props.userRole === "Admin"){
            axios.get(`/api/milestone/redAdmin`).then(response => {
                setRed(response.data);
                setLoadingRed(false);
            });

            axios.get(`/api/milestone/yellowAdmin`).then(response => {
                setYellow(response.data);
                setLoadingYellow(false);
            });

            axios.get(`/api/milestone/greenAdmin`).then(response => {
                setGreen(response.data);
                setLoadingGreen(false);
            });
        } 
        else {
            axios.get(`/api/milestone/redUserSchedules/${props.userid}`).then(response => {
                setRed(response.data);
                setLoadingRed(false);
            });

            axios.get(`/api/milestone/yellowUserSchedules/${props.userid}`).then(response => {
                setYellow(response.data);
                setLoadingYellow(false);
            });

            axios.get(`/api/milestone/greenUserSchedules/${props.userid}`).then(response => {
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
            <Card.Header className="text-center cardHead">Schedule Summary</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <div className="box green">
                                <p className="category">Tracked Milestones on Schedule</p>
                                <p className="value">{green[0].count}</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="box yellow">
                                <p className="category">Tracked Milestones Within 5 Days</p>
                                <p className="value">{yellow[0].count}</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="box red">
                                <p className="category">Tracked Milestones Behind Schedule</p>
                                <p className="value">{red[0].count}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}