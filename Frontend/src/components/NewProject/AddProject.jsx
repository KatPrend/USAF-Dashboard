import React, { useEffect, useState } from "react";
import axios from "axios";
import {Button, Col, Form, Row} from 'react-bootstrap';

export const AddProject = ({getProjectName}) => {

    const [projectName, setProjectName] = useState("");
    const [projectType, setProjectType] = useState("1");
    const [contractor, setContractor] = useState("-1");
    const [contractStatus, setContractStatus] = useState("1");
    const [branch, setBranch] = useState("");
    const [contractNum, setContractNum] = useState("");
    const [requirementType, setRequirementType] = useState("1");
    const [summary, setSummary] = useState("");
    const [ccarNum, setCcar] = useState("");
    const [projectStart, setProjectStart] = useState("");
    const [projectEnd, setProjectEnd] = useState("");

    const [isLoading, setLoading] = useState(true);
    const [contractors, setContractors] = useState();

    useEffect(() => {
        axios.get('/api/contract').then(response => {
            setContractors(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    const handleProjectName = (e) => {
        setProjectName(e.target.value);
    };
    
    const handleProjectType = (e) => {
        setProjectType(e.target.value);
    };

    const handleContractor = (e) => {
      setContractor(e.target.value);
  };

    const handleContractStatus = (e) => {
        setContractStatus(e.target.value);
    };

    const handleBranch = (e) => {
        setBranch(e.target.value);
    };

    const handleContractNum = (e) => {
        setContractNum(e.target.value);
    };

    const handleRequirementType = (e) => {
        setRequirementType(e.target.value);
    };

    const handleSummary = (e) => {
        setSummary(e.target.value);
    };

    const handleCcar = (e) => {
        setCcar(e.target.value);
    };

    const handleProjectStart = (e) => {
      setProjectStart(e.target.value);
    };
    
    const handleProjectEnd = (e) => {
        setProjectEnd(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Project Added");

        let projectId = -1;

        axios.post('/api/project', {
            project_name: projectName,
            project_type: projectType,
            contractor_id: contractor,
            contract_status: contractStatus,
            branch: branch,
            contract_num: contractNum,
            requirement_type: requirementType,
            summary: summary,
            ccar_num: ccarNum,
            start_date: projectStart,
            end_date: projectEnd
        })
        .then(function(res){
            console.log(res);

            projectId = res.data.insertId;
            console.log("In AddProject, project Id = " + projectId);

            getProjectName(projectId, projectName);
        })
        .catch(function (err){
            console.log(err);
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Project Name:</Form.Label>
            <Col sm={7}>
              <Form.Control
                placeholder="Enter projectName"
                type="projectName"
                onChange={handleProjectName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Project Type:</Form.Label>
            <Col sm={7}>
              <Form.Control 
                as="select"
                defaultValue={1}
                type="projectType"
                onChange={handleProjectType}>
                
                <option value="1">Contract</option>
                <option value="2">MIPR</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Contractor:</Form.Label>
            <Col sm={7}>
              <Form.Control 
                as="select"
                type="contractor"
                onChange={handleContractor}
                defaultValue={-1}>
                
                <option value={-1}></option>
                {contractors.map((element, index) => (
                  <option key={index} value={element.id}>{element.contractor_name}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Contract Status:</Form.Label>
            <Col sm={7}>
              <Form.Control 
                as="select"
                defaultValue={1}
                type="contractStatus"
                onChange={handleContractStatus}>
                  
                <option value="1">Pre-Awarded</option>
                <option value="2">Awarded</option>
                <option value="3">Closed</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Contract Number:</Form.Label>
            <Col sm={7}>
              <Form.Control
                placeholder=" Enter contractNum"
                type="contractNum"
                onChange={handleContractNum}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Enter Branch:</Form.Label>
            <Col sm={7}>
              <Form.Control
                placeholder=" Enter branch"
                type="branch"
                onChange={handleBranch}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Enter Requirement Type:</Form.Label>
            <Col sm={7}>
              <Form.Control 
                as="select"
                defaultValue={1}
                type="RequirementType"
                onChange={handleRequirementType}>
                
                <option value="1">CDD</option>
                <option value="2">CPD</option>
                <option value="3">1067</option>
                <option value="4">UON/JUONs</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Enter Project Summary:</Form.Label>
            <Col sm={7}>
              <Form.Control
                as="textarea"
                placeholder=" Enter Summary"
                type="Summary"
                onChange={handleSummary}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Enter CCar Number:</Form.Label>
            <Col sm={7}>
              <Form.Control
                placeholder=" Enter Ccar Number"
                type="Ccar"
                onChange={handleCcar}
              />
            </Col>
          </Form.Group>
          <br />
          <Form.Group as={Row} className='project-element'>
            <Form.Label column xs="auto">Start Date:</Form.Label>
            <Col xs="auto">
              <Form.Control
                placeholder="Start Date"
                type="date"
                value={projectStart}
                onChange={handleProjectStart}
              />
            </Col>
            <Form.Label column xs="auto">End Date:</Form.Label>
            <Col xs="auto">
              <Form.Control
                placeholder="End Date"
                type="date"
                value={projectEnd}
                onChange={handleProjectEnd}
              />
            </Col>
          </Form.Group>
          <br />
          <Button type="submit" className="submit-new-project">
            Submit New Project
          </Button>
        </Form>
    );
}