import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Table, Modal, ModalBody, ButtonGroup, ModalDialog, Form, Alert} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import {Chart} from "react-google-charts";
import axios from 'axios';
import { format } from 'date-fns';
import { UploadScheduleModal } from './UploadScheduleModal';
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

const getOptions = (cHeight) => {
    const options = {
        gantt: {
            criticalPathEnabled: true,
            criticalPathStyle: {
                stroke: "#e64a19",
            },
        },
        height: cHeight
    };

    return options;
}

  
export const ProjectSchedule = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [infoData, setInfoData] = useState();
    const [editData, setEditData] = useState();
    const [columsEdited, setColumsEdited] = useState([]);
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [showRowAlert, setShowRowAlert] = useState(false);
    const [rowToDelete, setRowToDelete] = useState();
    const [uploadModal, setUploadModal] = useState(false);
    const [reload, setReload] = useState(false);

    let chartHeight = 0;

    useEffect(() => {
        axios.get(`/api/milestone/schedule/${props.data}`).then(response =>{
            setInfoData(response.data);
            setEditData(response.data);
            setLoading(false);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        editData.forEach((currRow, index) => {

                console.log(editData);
            if(columsEdited.includes(index) === true ){
                axios.put('/api/milestone', {
                    milestone_id: currRow.ID,
                    project_id: currRow.project_id,
                    task_name: currRow.Name,
                    projected_start: currRow.ProjectedStart !== null ? null : currRow.ProjectedStart.replace(/T.+/, ''),
                    projected_end: currRow.ProjectedEnd !== null ? null : currRow.ProjectedEnd.replace(/T.+/, ''),
                    actual_start: currRow.ActualStart !== null ? currRow.ActualStart.replace(/T.+/, '') : null ,
                    actual_end: currRow.ActualEnd !== null ? currRow.ActualEnd.replace(/T.+/, '') : null ,
                })
            
                console.log(currRow.Predecessors.split(","))


                axios.delete('api/dependency/removeAllAssociated', {
                    data:{successor_milestone: currRow.ID}
                })

                currRow.Predecessors.split(",").forEach(element => {
                    axios.post('/api/dependency', {
                        predecessor_project: currRow.project_id, 
                        predecessor_milestone: element,
                        successor_project: currRow.project_id,
                        successor_milestone: currRow.ID
                    })
                    })
                }
            // : null
        });

        // editData.map((currRow, index) => (
        //     //columsEdited.includes(index) === true ? console.log(currRow) : null
        //     // Update that sends these Json objects to the database
            
            


        //     // (columsEdited.includes(index) === true 
        //     // ? 
 
            
        //     // : null)

        // ))

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

    const handleProjectedStart = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))
            
        temp.ProjectedStart = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))

    }

    const handleProjectedEnd = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp.ProjectedEnd = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
            
    }


    const handleActualStart = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp.ActualStart = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleActualEnd = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp.ActualEnd = e.target.value;
        
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

    const getOpenUploadModal = (open) => {
        setUploadModal(open);

        if (!open) {
            setReload(true);
        }
    }

    if (reload) {
        axios.get(`/api/milestone/schedule/${props.data}`).then(response =>{
            setInfoData(response.data);
            setEditData(response.data);
            setLoading(false);
        });

        setReload(false);
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
                                    <th>Projected Start</th>
                                    <th>Projected End</th>
                                    <th>Actual Start</th>
                                    <th>Actual End</th>
                                    <th>Predecessors</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    editData.map(({ID, Name, ProjectedStart, ProjectedEnd, Predecessors, ActualStart, ActualEnd,}, index) => (
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
                                                    defaultValue={ProjectedStart.replace(/T.+/, '')} 
                                                    type='date'
                                                    onChange={(e) => handleProjectedStart(e, index)}/>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group key={ID}>
                                                    <Form.Control 
                                                    defaultValue={ProjectedEnd.replace(/T.+/, '')} 
                                                    type='date'
                                                    onChange={(e) => handleProjectedEnd(e, index)}/>
                                                </Form.Group>
                                            </td>

                                            <td>
                                            <Form.Group key={ID}>
                                                <Form.Control 
                                                defaultValue={ActualStart !== null ? ActualStart.replace(/T.+/, '') : "N/A" }
                                                type='date'
                                                onChange={(e) => handleActualStart(e, index)}/>
                                            </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group key={ID}>
                                                    <Form.Control 
                                                    defaultValue={ActualEnd !== null ? ActualEnd.replace(/T.+/, '') : "N/A" } 
                                                    type='date'
                                                    onChange={(e) => handleActualEnd(e, index)}/>
                                                </Form.Group>
                                            </td>
                                                <td>
                                                    <Form.Group key={ID}>
                                                        <Form.Control 
                                                        placeholder='1,2,3...'
                                                        defaultValue={Predecessors}
                                                        onChange={(e) => handlePredecessors(e, index)}/>
                                                    </Form.Group>
                                                </td>
                                            </tr>
                                ))}
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
        
        <UploadScheduleModal projectId={props.data} open={uploadModal} getOpenUploadModal={getOpenUploadModal}/>

        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Project Schedule</span>
                        </Col>
                        { props.userRole === "Contractor" ? null : infoData.length === 0 ? <Col style={{textAlign: 'right'}}>
                                <span><Button className='Button' onClick={()=>setUploadModal(true)}>Add</Button></span>
                            </Col> : <Col style={{textAlign: 'right'}}>
                                <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
                            </Col>
                        }
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
                                                <td>{ActualStart !== null ? format(new Date(ActualStart), 'MM/dd/yyyy') : "No Date" }</td>
                                                <td>{ActualEnd !== null ? format(new Date(ActualEnd), 'MM/dd/yyyy') : "No Date" }</td>
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
                            {infoData.length === 0 ? null : <Chart
                            chartType='Gantt'
                            width="100%" 
                            height="100%"
                            options={getOptions(infoData.length * 55)}
                            data={GanttChartDataFormat(infoData)}
                            />}
                        </Col>
                    </Row>
                </Container>}
            </Card.Body>
        </Card>
        </>
    );
}