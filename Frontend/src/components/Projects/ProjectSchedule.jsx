import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Table, Modal, ModalBody, ButtonGroup, ModalDialog, Form, Alert} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import {Chart} from "react-google-charts";
import axios from 'axios';
import { format } from 'date-fns';
// import {TimeLineData, TimeLineData2} from '../pages/DummyData'

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
            new Date(data.Start),
            new Date(data.End),
            null, 
            null,
            data.Predecessors == null ? null : (data.Predecessors).toString()
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
    const [editData, setEditData] = useState();
    const [columsEdited, setColumsEdited] = useState([]);
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [showRowAlert, setShowRowAlert] = useState(false);
    const [rowToDelete, setRowToDelete] = useState();

    useEffect(() => {
        axios.get(`/api/milestone/schedule/${props.data}`).then(response =>{
            setInfoData(response.data);
            setEditData(response.data);
            setLoading(false);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        editData.map((currRow, index) => (
            columsEdited.includes(index) === true ? console.log(currRow) : null
        ))

        setColumsEdited([]);

    }

    const handleName = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp.Name = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleStart = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp.Start = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleEnd = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp.End = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handlePredecessors = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp.Predecessors = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleAddRow = async (e) => {
        e.preventDefault();
    }

    const handleRowAlert = (row) => {
        setRowToDelete(row);
        setShowRowAlert(true);
    }

    const DeleteRow = async (e, row) => {
        e.preventDefault();
    }


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
                                    <Button className='Button' type='submit' form='ProjectSchedule'>Save</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit} id="ProjectSchedule">
                        <Table responsive striped bordered hover className="bg-light">
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Predecessors</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    editData.map(({ID, Name, Start, End, Predecessors}, index) => (
                                        <tr key={ID}>
                                            <td><Button className="Button" onClick={() => handleRowAlert(ID)}>Delete Milestone {ID}</Button></td>
                                            <td>
                                                {ID}
                                            </td>
                                            <td>
                                                <Form.Group key={ID}>
                                                    <Form.Control 
                                                    defaultValue={Name}
                                                    onChange={(e) => handleName(e, index)}/>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group key={ID}>
                                                    <Form.Control 
                                                    value={format(new Date(Start), 'yyyy-MM-dd')} 
                                                    type='date'
                                                    onChange={(e) => handleStart(e, index)}/>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group key={ID}>
                                                    <Form.Control 
                                                    value={format(new Date(End), 'yyyy-MM-dd')} 
                                                    type='date'
                                                    onChange={(e) => handleEnd(e, index)}/>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group key={ID}>
                                                    <Form.Control 
                                                    defaultValue={Predecessors}
                                                    onChange={(e) => handlePredecessors(e, index)}/>
                                                </Form.Group>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <Button className="Button" onClick={handleAddRow}>Add Milestone</Button>
                        <Alert show={showRowAlert} variant="danger">
                            <Alert.Heading>Are You Sure you want to delete Milestone {rowToDelete}</Alert.Heading>
                            <Button variant="outline-danger" onClick={() => setShowRowAlert(false)}>Cancel</Button>
                            <Button variant="outline-danger">Delete</Button>
                        </Alert>
                    </Form>
                    
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
                        { props.userRole === "Contractor" ? null : <Col style={{textAlign: 'right'}}>
                                <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
                            </Col>
                        }
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
                                        <th>Name</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Predecessors</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        infoData.map(({ID, Name, Start, End, Predecessors_Name}) => (
                                            <tr key={ID}>
                                                <td>{Name}</td>
                                                <td>{format(new Date(Start), 'MM/dd/yyyy')}</td>
                                                <td>{format(new Date(End), 'MM/dd/yyyy')}</td>
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
                </Container>
            </Card.Body>
        </Card>
        </>

        
    );
}