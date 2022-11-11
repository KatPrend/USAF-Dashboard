import React, { useEffect, useState} from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, ModalBody, ButtonGroup, ModalDialog, Table } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import axios from 'axios';
import { format } from 'date-fns';

export const Dependencies = (props) => {
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [predecessors, setPred] = useState();
    const [successors, setSucc] = useState();
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [milestones, setMilestones] = useState();
    const [isLoading3, setLoading3] = useState(true);
    const [projects, setProjects] = useState(true);
    const [isLoading4, setLoading4] = useState(true);

    const [predProject, setPredProject] = useState(0);
    const [predSchedule, setPredSchedule] = useState();
    const [isLoading5, setLoading5] = useState(true);
    const [predMilestone, setPredMilestone] = useState(0);
    const [predSuccMilestone, setPredSuccMilestone] = useState(0);
    const [addPred, setAddPred] = useState(false);

    const [succPredMilestone, setSuccPredMilestone] = useState(0);
    const [succProject, setSuccProject] = useState(0);
    const [succSchedule, setSuccSchedule] = useState();
    const [isLoading6, setLoading6] = useState(true);
    const [succMilestone, setSuccMilestone] = useState(0);
    const [addSucc, setAddSucc] = useState(false);

    useEffect(() => {
        axios.get(`/api/dependency/predecessor/${props.projectId}`).then(response =>{
            setPred(response.data);
            setLoading1(false);
        });
        
        axios.get(`/api/dependency/successor/${props.projectId}`).then(response =>{
            setSucc(response.data);
            setLoading2(false);
        });

        axios.get(`/api/milestone/schedule/${props.projectId}`).then(response =>{
            setMilestones(response.data);
            setLoading3(false);
        });

        axios.get(`/api/project/`).then(response =>{
            setProjects(response.data);
            setLoading4(false);
        });
    }, []);
    
    if(isLoading1 || isLoading2 || isLoading3 || isLoading4) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    let handleSelectAddPredProject = (e) => {
        setPredProject(e.target.value);
        setLoading5(true);

        axios.get(`/api/milestone/schedule/${e.target.value}`).then(response =>{
            setPredSchedule(response.data);
            setLoading5(false);
        });

        setAddSucc(false);
        setAddPred(false);
    }
    let handleSelectAddPredMilestone = (e) => {
        setPredMilestone(e.target.value);
    }
    let handleSelectAddPredSucc = (e) => {
        setPredSuccMilestone(e.target.value);
    }
    let hanldeSubmitNewPred = async (e) => {
        e.preventDefault();

        axios.post('/api/dependency/', {
            predecessor_project: predProject,
            predecessor_milestone: predMilestone,
            successor_project: props.projectId,
            successor_milestone: predSuccMilestone
        })
        .then(function(res) {
            setAddPred(true);
            setPredProject(0);
            setPredMilestone(0);
            setPredSuccMilestone(0);

            axios.get(`/api/dependency/predecessor/${props.projectId}`).then(response =>{
                setPred(response.data);
                setLoading1(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    let handleSelectPredForSucc = (e) => {
        setSuccPredMilestone(e.target.value);

        setAddSucc(false);
        setAddPred(false);
    }
    let handleSelectSuccProject = (e) => {
        setSuccProject(e.target.value);
        setLoading6(true);

        axios.get(`/api/milestone/schedule/${e.target.value}`).then(response =>{
            setSuccSchedule(response.data);
            setLoading6(false);
        });
    }
    let handleSelectAddSucc = (e) => {
        setSuccMilestone(e.target.value);
    }
    let handleSubmitNewSucc = async (e) => {
        e.preventDefault();

        axios.post('/api/dependency/', {
            predecessor_project: props.projectId,
            predecessor_milestone: succPredMilestone,
            successor_project: succProject,
            successor_milestone: succMilestone
        })
        .then(function(res) {
            setAddSucc(true);
            setSuccPredMilestone(0);
            setSuccProject(0);
            setSuccMilestone(0);

            axios.get(`/api/dependency/successor/${props.projectId}`).then(response =>{
                setSucc(response.data);
                setLoading2(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    return (
        <>
        <ModalDialog scrollable>
            <Modal show={ModalIsOpen} size='xl' autoFocus={true}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col style={{textAlign: 'left'}}>
                                <h3>Project Dependencies Edit</h3>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button' onClick={()=>setModalIsOpen(false)}>Done</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    {milestones.length === 0 ? <div>There are currently no milestones for this project.</div> : <Container>
                        <Row style={{marginBottom:"5%"}}>
                            <Col>
                                <span><h4 style={{marginBottom:"5%"}}>Add Predecessor</h4></span>
                                <Form>
                                    <Form.Group style={{marginBottom:"3%"}}>
                                        <Form.Label>Select Predecessor Project:</Form.Label>
                                        <Form.Control as="select" onChange={handleSelectAddPredProject}>
                                            <option key={0} value={0}>Choose Project</option>
                                            {projects.map((element, index) => (
                                                (element.id === props.projectId ? null : <option key={index} value={element.id}>{element.project_name}</option>)
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    {predProject === 0 ? null : 
                                     isLoading5 ? <div>Loading Predecessor Milestones...</div> :
                                     <Form.Group style={{marginBottom:"3%"}}>
                                        <Form.Label>Select Predecessor Milestone:</Form.Label>
                                        <Form.Control as="select" onChange={handleSelectAddPredMilestone}>
                                            <option key={0} value={0}>Choose Milestone</option>
                                            {predSchedule.map((element, index) => (
                                                <option key={index} value={element.ID}>{element.Name}: {format(new Date(element.ProjectedStart), 'yyyy/MM/dd')} - {format(new Date(element.ProjectedEnd), 'yyyy/MM/dd')}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>}
                                    {predMilestone === 0 ? null : <Form.Group style={{marginBottom:"3%"}}>
                                        <Form.Label>Select Successor Milestone from this project:</Form.Label>
                                        <Form.Control as="select" onChange={handleSelectAddPredSucc}>
                                            <option key={0} value={0}>Choose Milestone</option>
                                            {milestones.map((element, index) => (
                                                <option key={index} value={element.ID}>{element.Name}: {format(new Date(element.ProjectedStart), 'yyyy/MM/dd')} - {format(new Date(element.ProjectedEnd), 'yyyy/MM/dd')}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>}
                                </Form>
                                {predSuccMilestone === 0 ? null : <Button className='Button' onClick={hanldeSubmitNewPred}>Submit</Button>}
                                {addPred ? <div>Successfully added!</div> : null}
                            </Col>
                            <Col>
                                <span><h4 style={{marginBottom:"5%"}}>Add Successor</h4></span>
                                <Form>
                                    <Form.Group style={{marginBottom:"3%"}}>
                                        <Form.Label>Select Predecessor Milestone from this project:</Form.Label>
                                        <Form.Control as="select" onChange={handleSelectPredForSucc}>
                                            <option key={0} value={0}>Choose Milestone</option>
                                            {milestones.map((element, index) => (
                                                <option key={index} value={element.ID}>{element.Name}: {format(new Date(element.ProjectedStart), 'yyyy/MM/dd')} - {format(new Date(element.ProjectedEnd), 'yyyy/MM/dd')}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    {succPredMilestone === 0 ? null : <Form.Group style={{marginBottom:"3%"}}>
                                        <Form.Label>Select Successor Project:</Form.Label>
                                        <Form.Control as="select" onChange={handleSelectSuccProject}>
                                            <option key={0} value={0}>Choose Project</option>
                                            {projects.map((element, index) => (
                                                (element.id === props.projectId ? null : <option key={index} value={element.id}>{element.project_name}</option>)
                                            ))}
                                        </Form.Control>
                                    </Form.Group>}
                                    {succProject === 0 ? null : 
                                    isLoading6 ? <div>Loading Successor Milestones...</div> :
                                    <Form.Group style={{marginBottom:"3%"}}>
                                        <Form.Label>Select Successor Milestone:</Form.Label>
                                        <Form.Control as="select" onChange={handleSelectAddSucc}>
                                            <option key={0} value={0}>Choose Milestone</option>
                                            {succSchedule.map((element, index) => (
                                                <option key={index} value={element.ID}>{element.Name}: {format(new Date(element.ProjectedStart), 'yyyy/MM/dd')} - {format(new Date(element.ProjectedEnd), 'yyyy/MM/dd')}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>}
                                </Form>
                                {succMilestone === 0 ? null : <Button className='Button' onClick={handleSubmitNewSucc}>Submit</Button>}
                                {addSucc ? <div>Successfully added!</div> : null}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span><h4>Remove Predecessor</h4></span>
                            </Col>
                            <Col>
                                <span><h4>Remove Successor</h4></span>
                            </Col>
                        </Row>
                    </Container>}
                </ModalBody>
            </Modal>
        </ModalDialog>


        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Project Dependencies</span>
                        </Col>
                        { props.userRole === "Contractor" ? null : <Col style={{textAlign: 'right'}}>
                                <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
                            </Col>
                        }
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
                                    <tr>
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
                                    <tr>
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