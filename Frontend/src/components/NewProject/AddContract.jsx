import React, { useEffect, useState } from "react";
import axios from "axios";
import {Button, Col, Form, Row} from 'react-bootstrap';
import { format } from 'date-fns';

export const AddContract = (props) => {
  const [contractStatus, setContractStatus] = useState("");
  const [contractNum, setContractNum] = useState("");
  const [requirementPlan, setRequirementPlan] = useState("");
  const [draftRfpReleased, setDraftRfpReleased] = useState("");
  const [contractDaysAdded, setDaysAdded] = useState("");
  const [isLoading, setLoading] = useState(true);
  
  const handleContractStatus = (e) => {
    setContractStatus(e.target.value);
  };
  
  const handleContractNum = (e) => {
    setContractNum(e.target.value);
  };

  const handleRequirementPlan = (e) => {
    setRequirementPlan(e.target.value);
    const reqPlan = new Date(e.target.value);

    reqPlan.setDate(reqPlan.getDate() + contractDaysAdded[0].draft_rfp_released);

    setDraftRfpReleased(format(reqPlan, 'yyyy-MM-dd'));


  };

  const handleDraftRfpReleased = (e) => {
    setDraftRfpReleased(e.target.value);
  };
  
  useEffect(() => {
    axios.get('/api/contract/daysAdded').then(response => {
        setDaysAdded(response.data);
        setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="mx-auto w-75">Loading...</div>;
  }

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Contract Added");

        let projectId = props.id;

        axios.post('/api/project', {
          project_id: projectId,
          contract_status: contractStatus,
          contract_num: contractNum,
          requirement_plan: requirementPlan, 
          draft_rfp_released: requirementPlan, 
          approved_by_acb:  requirementPlan, 
          rfp_releases: requirementPlan, 
          proposal_received: requirementPlan, 
          tech_eval_comp: requirementPlan, 
          negotiation_comp: requirementPlan, 
          awarded: requirementPlan
        })
        .then(function(res){
            console.log(res);
        })
        .catch(function (err){
            console.log(err);
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>Contract Status:</Form.Label>
            <Col sm={7}>
              <Form.Control 
                as="select"
                placeholder=" Enter contractStatus"
                type="contractStatus"
                onChange={handleContractStatus}>

                <option value="0"></option>
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
          <br />
          <h5>Contract Award Timeline</h5>
          <Form.Group as={Row} className='project-element'>
            <Form.Label column xs="auto">Requirement Planning Date:</Form.Label>
            <Col xs="auto">
              <Form.Control
                placeholder="Requirement Plan Date"
                type="date"
                value={requirementPlan}
                onChange={handleRequirementPlan}
              />
            </Col>
          </Form.Group>
          <br />
          <Form.Group as={Row} className='project-element'>
            <Form.Label column xs="auto">Draft Rfp Released:</Form.Label>
            <Col xs="auto">
              <Form.Control
                placeholder="Draft Rfp Released"
                type="date"
                value={draftRfpReleased}
                onChange={handleDraftRfpReleased}
              />
            </Col>
          </Form.Group>
          <br />
          <Form.Group as={Row} className='project-element'>
          <Form.Label column xs="auto">Draft Rfp Released:</Form.Label>
          <Col xs="auto">
            <Form.Control
              placeholder="Draft Rfp Released"
              type="date"
              value={draftRfpReleased}
              onChange={handleDraftRfpReleased}
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