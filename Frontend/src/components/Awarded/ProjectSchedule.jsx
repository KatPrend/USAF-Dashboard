import React from 'react';
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';
import {Chart} from "react-google-charts";
import {TimeLineData} from '../../pages/DummyData'

export const ProjectSchedule = () => {
    return (
        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Project Schedule</span>
                        </Col>
                        <Col style={{textAlign: 'right'}}>
                            <span><Button className='Button'>Edit</Button></span>
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Duration</th>
                                        <th>Start</th>
                                        <th>Finish</th>
                                        <th>Predecessors</th>
                                        <th>WBS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TimeLineData.map( (data) => (
                                        <tr>
                                            <td>{data.ID}</td>
                                            <td>{data.Name}</td>
                                            <td>{data.Duration}</td>
                                            <td>{data.Start}</td>
                                            <td>{data.Finish}</td>
                                            <td>{data.Predecessors}</td>
                                            <td>{data.WBS}</td>
                                        </tr>
                                        
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/*<Chart
                            chartType='Gantt'
                            data={data}
                                    />*/}
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}