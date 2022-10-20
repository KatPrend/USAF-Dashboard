import React from 'react';
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';
import {Chart} from "react-google-charts";
import {TimeLineData, TimeLineData2} from '../../pages/DummyData'

const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  function GanttChartDataFormat(JsonData){

    var Rows = [];

    JsonData.map( (data) => (
        Rows.push([
            data.ID, 
            data.Name, 
            new Date(data.Start), 
            new Date(data.End), 
            data.Duration, 
            null,
            data.Predecessors
        ])
    ))

    const data = [columns, ...Rows];

    return (data);
  }

  const options = {
    gantt: {
      criticalPathEnabled: true,
      criticalPathStyle: {
        stroke: "#e64a19",
      },
    },
  };

  
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
                            <Table responsive striped bordered hover className="bg-light">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Duration</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Predecessors</th>
                                        <th>WBS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TimeLineData2.map( (data) => (
                                        <tr>
                                            <td>{data.ID}</td>
                                            <td>{data.Name}</td>
                                            <td>{data.Duration}</td>
                                            <td>{data.Start}</td>
                                            <td>{data.End}</td>
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
                            <Chart
                            chartType='Gantt'
                            width="100%" 
                            height="50%"
                            options={options}
                            data={GanttChartDataFormat(TimeLineData2)}
                            />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}