import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, ButtonGroup, Card, Col, Container, Row, Modal, ModalBody, ModalDialog, Form, } from "react-bootstrap";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
//import { propTypes } from 'react-bootstrap/esm/Image';
import { Link } from 'react-router-dom';
import "./projectData.css"
import { NewWBSModal } from './NewWBSModal';

export const ProjectData = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [openWBS, setOpenWBS] = useState(false);

    const [projectNameEdit, setProjectName] = useState("");
    const [contractNumberEdit, setContractNumber] = useState("");
    const [contractorEdit, setContractor] = useState("");
    const [branchEdit, setBranch] = useState("");
    const [requirementTypeEdit, setRequirementType] = useState("");
    const [summaryEdit, setSummary] = useState("");
    const [ccarNumEdit, setCcar] = useState("");
    const [contractors, setContractors] = useState([]);
    const [branches, setBranches] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/project/${props.data}`).then(response => {
            
            setData(response.data);
            setLoading(false);
        });
        axios.get('/api/contractor').then(response => {
            setContractors(response.data);
        });
        axios.get('/api/branch/').then(response => {
            setBranches(response.data);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        data.map(({id,project_name, contractor_id, contract_num, ccar_num, branch_id, requirement_type_id, summary, project_type}) => (
            axios.put(`/api/project/${id}`, {
                id: id,
                project_name: (projectNameEdit === "" ? project_name : projectNameEdit),
                project_type: project_type,
                contractor_id: (contractorEdit === "" ? contractor_id : contractorEdit),
                branch_id: (branchEdit === "" ? branch_id : branchEdit),
                requirement_type_id: (requirementTypeEdit === "" ? requirement_type_id : requirementTypeEdit),
                summary: (summaryEdit === "" ? summary : summaryEdit),
                ccar_num: (ccarNumEdit === "" ? ccar_num : ccarNumEdit)
            })
        ))
        
        
    }
    const handleName = (e) => {
        setProjectName(e.target.value);
    }
    const handleContractNumber = (e) => {
        setContractNumber(e.target.value);
    }
    const handleContractor = (e) => {
        setContractor(e.target.value);
    }
    const handleBranch = (e) => {
        setBranch(e.target.value);
    }
    const handleRequirementType = (e) => {
        setRequirementType(e.target.value);
    }
    const handleCcarNumber = (e) => {
        setCcar(e.target.value);
    }
    const handleCapabilitySummery = (e) => {
        setSummary(e.target.value);
    }
    const getOpenWBSModal = (open) => {
        setOpenWBS(open);
    }


    return (
        <>
        <ModalDialog scrollable>
            <Modal show={ModalIsOpen} size='xl' autoFocus={true}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col style={{textAlign: 'left'}}>
                                <h3>Project Data Edit</h3>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button' onClick={()=>setModalIsOpen(false)}>Cancel</Button>
                                    <Button className='Button' type='submit' form='ProjectDataEdit'>Save</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    {
                        data.map(({id,project_name, contractor_id, contract_num, ccar_num, branch_id, requirement_type_id, summary}) => (
                            <Form key={id} id="ProjectDataEdit" onSubmit={handleSubmit}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Project Name</Form.Label>
                                    <Col sm={7}> 
                                        <Form.Control
                                            defaultValue={project_name}
                                            type="text"
                                            onChange={handleName}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Contract Number</Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            defaultValue={contract_num}
                                            type="text"
                                            onChange={handleContractNumber}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Ccar Number</Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            defaultValue={ccar_num}
                                            type="text"
                                            onChange={handleCcarNumber}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Contractor</Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            as="select"
                                            onChange={handleContractor}
                                            defaultValue={contractor_id}>
                                                {contractors.map((element, index) => (
                                                    <option key={index} value={element.id}>{element.contractor_name}</option>
                                                ))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Branch</Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            defaultValue={branch_id}
                                            as="select"
                                            onChange={handleBranch}>
                                                {branches.map((element, index) => (
                                                    <option key={index} value={element.id}>{element.branch_name}</option>
                                                ))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Requirement Type</Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            defaultValue={requirement_type_id}
                                            as="select"
                                            onChange={handleRequirementType}>
                                                
                                            <option value="1">CDD</option>
                                            <option value="2">CPD</option>
                                            <option value="3">1067</option>
                                            <option value="4">UON/JUONs</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Capability Summery</Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            as="textarea"
                                            defaultValue={summary}
                                            type="text"
                                            onChange={handleCapabilitySummery}
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        ))
                    }
                </ModalBody>
            </Modal>
        </ModalDialog>

        <NewWBSModal projectId={props.data} open={openWBS} getOpenWBSModal={getOpenWBSModal}/>

        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Project Data</span>
                        </Col>
                        { props.userRole === "Contractor" ? null : <Col style={{textAlign: 'right'}}>
                                <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
                            </Col>
                        }
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                {
                    data.map(({id,project_name, contractor_name, contract_num, contract_status, ccar_num, branch, requirement_type, summary}) => (
                        <div key = {id}>
                            <p className='project-data'><span>Project Name:</span> {project_name}</p>
                            <p className='project-data'><span>Contract Number:</span> {contract_num}</p>
                            <p className='project-data'><span>Contract Status:</span> {contract_status}</p>
                            <p className='project-data'><span>Ccar Number:</span> {ccar_num}</p>
                            <p className='project-data'><span>Contractor:</span> {contractor_name}</p>
                            <p className='project-data'><span>Branch:</span> {branch}</p>
                            <p className='project-data'><span>Requirement Type:</span> {requirement_type}</p>
                            <p className='project-data'><span>Capability Summary:</span> {summary}</p>
                        </div>
                    ))
                }
                <ButtonGroup className='CLIN-and-File-buttongroup'>
                    <Link to={{
                        pathname: '/clin',
                        state: {id:props.data}
                    }}> 
                    <Button className='Button'>See CLIN Data</Button>
                    </Link>
                    <Button className='Button' onClick={()=>setOpenWBS(true)}>Upload ProPricer</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
        </>
        
    );
}