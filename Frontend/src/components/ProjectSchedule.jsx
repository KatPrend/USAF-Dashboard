import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Table, Modal, ModalBody, ButtonGroup, ModalDialog, } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import {Chart} from "react-google-charts";
import axios from 'axios';
import { format } from 'date-fns';
import {TimeLineData, TimeLineData2} from '../pages/DummyData'

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
            (data.ID).toString(),
            data.Name, 
            // format(new Date(data.Start), 'MM/dd/yyyy'), 
            // format(new Date(data.End), 'MM/dd/yyyy'), 
            new Date(data.Start),
            new Date(data.End),
            data.Duration, 
            null,
            data.Predecessors
        ])
    ))

    const data = [columns, ...Rows];

    console.log(data);

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
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        axios.get(`/api/project/schedule/${props.data}`).then(response =>{
            setInfoData(response.data);
            setLoading(false);
        });
    }, []);

    if(isLoading){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
        <>
        <ModalDialog scrollable>
            <Modal show={ModalIsOpen} size='xl' autoFocus={true}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col style={{textAlign: 'left'}}>
                                <h3>Project Schedule Edit</h3>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button' onClick={()=>setModalIsOpen(false)}>Cancel</Button>
                                    <Button className='Button'>Save</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <Container>
                    </Container>
                </ModalBody>
            </Modal>
        </ModalDialog>


        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Project Schedule</span>
                        </Col>
                        <Col style={{textAlign: 'right'}}>
                            <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
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
                                    {
                                        infoData.map(({ID, Name, Duration, Start, End, Predecessors, WBS}) => (
                                            <tr key={ID}>
                                                <td>{ID}</td>
                                                <td>{Name}</td>
                                                <td>{Duration}</td>
                                                <td>{format(new Date(Start), 'MM/dd/yyyy')}</td>
                                                <td>{format(new Date(End), 'MM/dd/yyyy')}</td>
                                                <td>{Predecessors}</td>
                                                <td>{WBS}</td>
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
                            height="50%"
                            options={options}
                            // TimeLineData2
                            data={GanttChartDataFormat(infoData)}
                            />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
        </>

        
    );
}