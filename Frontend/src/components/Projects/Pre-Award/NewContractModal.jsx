import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Table, Modal, ModalBody, ButtonGroup, ModalDialog, Form } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { format } from 'date-fns';

export const NewContractModal = (props) => {
  const [requirementPlan, setRequirementPlan] = useState("");
  const [draftRfpReleased, setDraftRfpReleased] = useState("");
  const [approvedByAcb, setApprovedByAcb] = useState("");
  const [rfpReleased, setRfpReleased] = useState("");
  const [proposalReceived, setProposalReceived] = useState("");
  const [techEvalComp, setTechEvalComp] = useState("");
  const [negotiationComp, setNegotiationComp] = useState("");
  const [awarded, setAwarded] = useState("");
  const [contractDaysAdded, setDaysAdded] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [contractAwardId, setContractAwardId] = useState(props.contractId);

  console.log("contractId: " + contractAwardId);
  console.log("contractId: " + props.con);

  const handleRequirementPlan = (e) => {
    setRequirementPlan(e.target.value);
    const reqPlan = new Date(e.target.value);
    const draft_rfp_released = new Date(e.target.value);
    const approved_by_acb = new Date(e.target.value);
    const rfp_released = new Date(e.target.value);
    const proposal_received = new Date(e.target.value);
    const tech_eval_comp = new Date(e.target.value);
    const negotiation_comp = new Date(e.target.value);
    const awarded = new Date(e.target.value);

    draft_rfp_released.setDate(draft_rfp_released.getDate() + contractDaysAdded[0].draft_rfp_released);
    approved_by_acb.setDate(approved_by_acb.getDate() + contractDaysAdded[0].approved_by_acb);
    rfp_released.setDate(rfp_released.getDate() + contractDaysAdded[0].rfp_released);
    proposal_received.setDate(proposal_received.getDate() + contractDaysAdded[0].proposal_received);
    tech_eval_comp.setDate(tech_eval_comp.getDate() + contractDaysAdded[0].tech_eval_comp);
    negotiation_comp.setDate(negotiation_comp.getDate() + contractDaysAdded[0].negotiation_comp);
    awarded.setDate(awarded.getDate() + contractDaysAdded[0].awarded);

    setDraftRfpReleased(format(draft_rfp_released, 'yyyy-MM-dd'));
    setApprovedByAcb(format(approved_by_acb, 'yyyy-MM-dd'));
    setRfpReleased(format(rfp_released, 'yyyy-MM-dd'));
    setProposalReceived(format(proposal_received, 'yyyy-MM-dd'));
    setTechEvalComp(format(tech_eval_comp, 'yyyy-MM-dd'));
    setNegotiationComp(format(negotiation_comp, 'yyyy-MM-dd'));
    setAwarded(format(awarded, 'yyyy-MM-dd'));

  };

  const handleDraftRfpReleased = (e) => {
    setDraftRfpReleased(e.target.value);
  };
  const handleApprovedByAcb = (e) => {
    setApprovedByAcb(e.target.value);
  };
  const handleRfpReleased = (e) => {
    setRfpReleased(e.target.value);
  };
  const handleProposalReceived = (e) => {
    setProposalReceived(e.target.value);
  };
  const handleTechEvalComp = (e) => {
    setTechEvalComp(e.target.value);
  };
  const handleNegotiationComp = (e) => {
    setNegotiationComp(e.target.value);
  };
  const handleAwarded = (e) => {
    setAwarded(e.target.value);
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

        axios.post('/api/contract/contractTimeline', {
          contract_award_id: contractAwardId,
          requirement_plan: requirementPlan, 
          draft_rfp_released: draftRfpReleased, 
          approved_by_acb:  approvedByAcb, 
          rfp_released: rfpReleased, 
          proposal_received: proposalReceived, 
          tech_eval_comp: techEvalComp, 
          negotiation_comp: negotiationComp, 
          awarded: awarded
        })
        .then(function(res){
            console.log(res);
            props.setReload(true);
        })
        .catch(function (err){
            console.log(err);
        });
    };

    return (
        <ModalDialog scrollable>
            <Modal show={props.open} size='xl' autoFocus={true}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col style={{textAlign: 'left'}}>
                                <h3>Add Contract Award Timeline</h3>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button' onClick={()=>props.getOpenTimelineModal(false)}>Done</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <h5>Contract Award Timeline</h5>
                        <Form.Group as={Row} className='project-element'>
                            <Form.Label column xs="auto">Requirement Plan Date:</Form.Label>
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
                            <Form.Label column xs="auto">Approved By Acb:</Form.Label>
                            <Col xs="auto">
                            <Form.Control
                                placeholder="Approved By Acb"
                                type="date"
                                value={approvedByAcb}
                                onChange={handleApprovedByAcb}
                            />
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row} className='project-element'>
                            <Form.Label column xs="auto">Rfp Released:</Form.Label>
                            <Col xs="auto">
                            <Form.Control
                                placeholder="Rfp Released"
                                type="date"
                                value={rfpReleased}
                                onChange={handleRfpReleased}
                            />
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row} className='project-element'>
                            <Form.Label column xs="auto">Proprosal Received:</Form.Label>
                            <Col xs="auto">
                            <Form.Control
                                placeholder="Proprosal Received"
                                type="date"
                                value={proposalReceived}
                                onChange={handleProposalReceived}
                            />
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row} className='project-element'>
                            <Form.Label column xs="auto">Tech Eval Complete:</Form.Label>
                            <Col xs="auto">
                            <Form.Control
                                placeholder="Tech Eval Complete"
                                type="date"
                                value={techEvalComp}
                                onChange={handleTechEvalComp}
                            />
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row} className='project-element'>
                            <Form.Label column xs="auto">Negotiation Complete:</Form.Label>
                            <Col xs="auto">
                            <Form.Control
                                placeholder="Negotiation Complete"
                                type="date"
                                value={negotiationComp}
                                onChange={handleNegotiationComp}
                            />
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row} className='project-element'>
                            <Form.Label column xs="auto">Awarded:</Form.Label>
                            <Col xs="auto">
                            <Form.Control
                            placeholder="Awarded"
                            type="date"
                            value={awarded}
                            onChange={handleAwarded}
                            />
                            </Col>
                        </Form.Group>
                        <br />
                        <Button type="submit" className="submit-new-project">
                            Submit New Contract
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </ModalDialog>
    );
}