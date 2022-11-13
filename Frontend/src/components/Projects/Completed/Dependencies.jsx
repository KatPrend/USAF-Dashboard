import React, { useEffect, useState} from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';

export const Dependencies = (props) => {
    const [predecessors, setPred] = useState();
    const [successors, setSucc] = useState();
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);

    useEffect(() => {
        axios.get(`/api/dependency/predecessor/${props.projectId}`).then(response =>{
            setPred(response.data);
            setLoading1(false);
        });
        
        axios.get(`/api/dependency/successor/${props.projectId}`).then(response =>{
            setSucc(response.data);
            setLoading2(false);
        });
    }, []);
    
    if(isLoading1 || isLoading2) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
        <>

        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Project Dependencies</span>
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                {predecessors.length === 0 && successors.length === 0 ? <span>No Dependencies</span> : <Row>
                    <Col>
                        {predecessors.length === 0 ? <span>No predecessors for this project.</span> : <div>
                            <span style={{marginBottom:"3%"}}>Predecessors</span>
                            <Table responsive striped bordered hover className="bg-light">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Predecessor Project</th>
                                        <th>Milestone</th>
                                        <th>End Date</th>
                                        <th>Current Project</th>
                                        <th>Milestone</th>
                                        <th>Start Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {predecessors.map((element, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{element.predecessor_name}</td>
                                        <td>{element.predecessor_task_name}</td>
                                        <td>{format(new Date(element.predecessor_task_end_date), 'yyyy/MM/dd')}</td>
                                        <td>{element.dep_proj_name}</td>
                                        <td>{element.successor_task_name}</td>
                                        <td>{format(new Date(element.successor_task_start_date), 'yyyy/MM/dd')}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>}
                    </Col>
                    <Col>
                        {successors.length === 0 ? <span>No successors for this project.</span> : <div>
                            <span style={{marginBottom:"3%"}}>Successors</span>
                            <Table responsive striped bordered hover className="bg-light">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Current Project</th>
                                        <th>Milestone</th>
                                        <th>End Date</th>
                                        <th>Successor Project</th>
                                        <th>Milestone</th>
                                        <th>Start Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {successors.map((element, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{element.predecessor_name}</td>
                                        <td>{element.predecessor_task_name}</td>
                                        <td>{format(new Date(element.predecessor_task_end_date), 'yyyy/MM/dd')}</td>
                                        <td>{element.succ_proj_name}</td>
                                        <td>{element.successor_task_name}</td>
                                        <td>{format(new Date(element.successor_task_start_date), 'yyyy/MM/dd')}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>}
                    </Col>
                </Row>}
            </Card.Body>
        </Card>
        </>
        
    );
}