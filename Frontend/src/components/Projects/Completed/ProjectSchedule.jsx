import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Table} from 'react-bootstrap';
import {Chart} from "react-google-charts";
import axios from 'axios';
import { format } from 'date-fns';
// import {TimeLineData, TimeLineData2} from '../pages/DummyData'

const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start" },
    { type: "date", label: "End" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

function GanttChartDataFormat(JsonData){

    var Rows = [];

    JsonData.map( (data) => (
        Rows.push([
            (data.ID).toString(),
            data.Name, 
            new Date(data.ActualStart !== null ? data.ActualStart : data.ProjectedStart),
            new Date(data.ActualEnd !== null ? data.ActualEnd :data.ProjectedEnd),
            null, 
            null,
            data.Predecessors === null ? null : (data.Predecessors).toString()
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

  
export const ProjectSchedule = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [infoData, setInfoData] = useState();

    useEffect(() => {
        axios.get(`/api/milestone/schedule/${props.data}`).then(response =>{
            setInfoData(response.data);
            setLoading(false);
        });
    }, []);


    if(isLoading){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
        <>
        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Project Schedule</span>
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                {infoData.length === 0 ? <div>There are currently no project milestones.</div> : <Container>
                    <Row>
                        <Col>
                            <Table responsive striped bordered hover className="bg-light">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Projected Start</th>
                                        <th>Projected End</th>
                                        <th>Actual Start</th>
                                        <th>Actual End</th>
                                        <th>Predecessors</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        infoData.map(({ID, Name, ProjectedStart, ProjectedEnd, ActualStart, ActualEnd, Predecessors_Name}) => (
                                            <tr key={ID}>
                                                <td>{Name}</td>
                                                <td>{format(new Date(ProjectedStart), 'MM/dd/yyyy')}</td>
                                                <td>{format(new Date(ProjectedEnd), 'MM/dd/yyyy')}</td>
                                                <td>{ActualStart !== null ? format(new Date(ActualStart), 'MM/dd/yyyy') : "N/A" }</td>
                                                <td>{ActualEnd !== null ? format(new Date(ActualEnd), 'MM/dd/yyyy') : "N/A" }</td>
                                                <td>{Predecessors_Name}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Chart
                            chartType='Gantt'
                            width="100%" 
                            height="100%"
                            options={options}
                            data={GanttChartDataFormat(infoData)}
                            />
                        </Col>
                    </Row>
                </Container>}
            </Card.Body>
        </Card>
        </>
    );
}