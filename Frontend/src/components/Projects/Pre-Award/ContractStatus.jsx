import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Table, Modal, ModalBody, ButtonGroup, ModalDialog, Form } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import axios from 'axios';
import { format } from 'date-fns';
import { NewContractModal } from "./NewContractModal";
import { Link } from "react-router-dom";

export const ContractStatus = (props) => {
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [data, setData] = useState();
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [editData, setEditData] = useState();
    const [rowsEdited, setRowsEdited] = useState([]);
    const [reload, setReload] = useState(false);
    const [timelineModal, setTimelineModal] = useState(false);
    const [contractId, setContractId] = useState();
    const [awarded, setAwarded] = useState(false);

    useEffect(() => {
        axios.get(`/api/contract/contractawardtimeline/${props.data}`).then(response =>{
            setData(response.data);
            setEditData(response.data);
            setLoading1(false);
        });

        axios.get(`api/contract/contractAward/${props.data}`).then(response => {
            console.log(JSON.stringify(response.data));
            setContractId(response.data[0].id);
            setLoading2(false);
        });
    }, []);

    if(isLoading1 || isLoading2){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(editData);
        editData.map((currRow, index) => (
            
            (rowsEdited.includes(currRow.id) === true ? 
                axios.put(`/api/contract/updateContractTimeline/${currRow.id}`, {
                    id: currRow.id,
                    contract_award_id: currRow.contract_award_id,
                    timeline_status: currRow.timeline_status,
                    requirement_plan: currRow.requirement_plan !== null ?  currRow.requirement_plan.replace(/T.+/, '') : null,
                    draft_rfp_released: currRow.draft_rfp_released !== null ? currRow.draft_rfp_released.replace(/T.+/, ''): null,
                    approved_by_acb: currRow.approved_by_acb !== null ? currRow.approved_by_acb.replace(/T.+/, ''): null,
                    rfp_released: currRow.rfp_released !== null ? currRow.rfp_released.replace(/T.+/, ''): null,
                    proposal_received: currRow.proposal_received !== null ?  currRow.proposal_received.replace(/T.+/, ''): null,
                    tech_eval_comp: currRow.tech_eval_comp !== null ? currRow.tech_eval_comp.replace(/T.+/, ''): null,
                    negotiation_comp: currRow.negotiation_comp !== null ? currRow.negotiation_comp.replace(/T.+/, ''): null,
                    awarded: currRow.awarded !== null ? currRow.awarded.replace(/T.+/, ''): null
                })
                .then(function(res){
                    if (currRow.timeline_status === "Actual" && currRow.awarded !== null) {
                        setAwarded(true);
                    }
                })
            : null)
        ))
         
        setReload(true);
        setModalIsOpen(false);
        setRowsEdited([]);
    }

    const handle_requirement_plan = (e, ID) => {
        if(rowsEdited.includes(ID) === false){
            setRowsEdited([...rowsEdited, ID])
        }

        var temp;

        editData.map((currObject) => (
            currObject.id === ID ? temp = currObject : null
        ))
        
        temp.requirement_plan = e.target.value ;
        
        setEditData(editData.map((currObject) =>(
            currObject.id === ID ? {...currObject, temp} : {...currObject}
        )))
    }

    const handle_draft_rfp_released = (e, ID) => {
        if(rowsEdited.includes(ID) === false){
            setRowsEdited([...rowsEdited, ID])
        }

        var temp;

        editData.map((currObject) => (
            currObject.id === ID ? temp = currObject : null
        ))

        temp.draft_rfp_released = e.target.value ;
        
        setEditData(editData.map((currObject) =>(
            currObject.id === ID ? {...currObject, temp} : {...currObject}
        )))
    }

    const handle_approved_by_acb = (e, ID) => {
        if(rowsEdited.includes(ID) === false){
            setRowsEdited([...rowsEdited, ID])
        }

        var temp;

        editData.map((currObject) => (
            currObject.id === ID ? temp = currObject : null
        ))

        temp.approved_by_acb = e.target.value ;
        
        setEditData(editData.map((currObject) =>(
            currObject.id === ID ? {...currObject, temp} : {...currObject}
        )))
    }

    const handle_rfp_released = (e, ID) => {
        if(rowsEdited.includes(ID) === false){
            setRowsEdited([...rowsEdited, ID])
        }

        var temp;

        editData.map((currObject) => (
            currObject.id === ID ? temp = currObject : null
        ))

        temp.rfp_released = e.target.value ;
        
        setEditData(editData.map((currObject) =>(
            currObject.id === ID ? {...currObject, temp} : {...currObject}
        )))
    }

    const handle_proposal_received = (e, ID) => {
        if(rowsEdited.includes(ID) === false){
            setRowsEdited([...rowsEdited, ID])
        }

        var temp;

        editData.map((currObject) => (
            currObject.id === ID ? temp = currObject : null
        ))

        temp.proposal_received = e.target.value ;
        
        setEditData(editData.map((currObject) =>(
            currObject.id === ID ? {...currObject, temp} : {...currObject}
        )))
    }

    const handle_tech_eval_comp = (e, ID) => {
        if(rowsEdited.includes(ID) === false){
            setRowsEdited([...rowsEdited, ID])
        }

        var temp;

        editData.map((currObject) => (
            currObject.id === ID ? temp = currObject : null
        ))

        temp.tech_eval_comp = e.target.value ;
        
        setEditData(editData.map((currObject) =>(
            currObject.id === ID ? {...currObject, temp} : {...currObject}
        )))
    }

    const handle_negotiation_comp = (e, ID) => {
        if(rowsEdited.includes(ID) === false){
            setRowsEdited([...rowsEdited, ID])
        }

        var temp;

        editData.map((currObject) => (
            currObject.id === ID ? temp = currObject : null
        ))

        temp.negotiation_comp = e.target.value ;
        
        setEditData(editData.map((currObject) =>(
            currObject.id === ID ? {...currObject, temp} : {...currObject}
        )))
    }

    const handle_awarded = (e, ID) => {
        if(rowsEdited.includes(ID) === false){
            setRowsEdited([...rowsEdited, ID])
        }

        var temp;

        editData.map((currObject) => (
            currObject.id === ID ? temp = currObject : null
        ))

        temp.awarded = e.target.value;
        
        setEditData(editData.map((currObject) =>(
            currObject.id === ID ? {...currObject, temp} : {...currObject}
        )))
    }

    const getOpenTimelineModal = (open) => {
        setTimelineModal(open);
    }

    if (reload) {
        axios.get(`/api/contract/contractawardtimeline/${props.data}`).then(response =>{
            setData(response.data);
            setEditData(response.data);
            setLoading1(false);
        });

        setReload(false);
    }

    let handleAward = () => {
        axios.put(`/api/contract/status/${contractId}`, {
            contract_status: 'Awarded'
        })
        .then(function(res) {
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    const handleCloseModel = (e) => {
        setReload(true);
        setModalIsOpen(false);
    }

    return (
        <>
        <ModalDialog scrollable>
            <Modal show={ModalIsOpen} size='xl' autoFocus={true}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col style={{textAlign: 'left'}}>
                                <h3>Contract Status Edit</h3>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button' onClick={handleCloseModel}>Cancel</Button>
                                    <Button className='Button' type="submit" form="ContractAwardTimelineEdit">Save</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit} id="ContractAwardTimelineEdit">
                        <Table responsive striped bordered hover className="bg-light">
                            <thead>
                                <tr>
                                    <th>Timeline Status</th>
                                    <th>Requirements Planning</th>
                                    <th>Draft RFP Released</th>
                                    <th>Approved at ABC</th>
                                    <th>RFP Released</th>
                                    <th>Proposal Received</th>
                                    <th>Tech Eval Complete</th>
                                    <th>Negotiations Complete</th>
                                    <th>Awarded</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    editData.map(({id, timeline_status, requirement_plan, draft_rfp_released, approved_by_acb, rfp_released, proposal_received, tech_eval_comp, negotiation_comp, awarded}, index)=> (
                                        <tr key = {id}>
                                            <td>{timeline_status}</td>
                                            <td >
                                                <Form.Group key={requirement_plan}>
                                                    {requirement_plan !== null && requirement_plan !== "1969-12-31T05:00:00.000Z"?
                                                    <Form.Control 
                                                    defaultValue={requirement_plan.replace(/T.+/, '')} 
                                                    type='date'
                                                    onChange={(e) => handle_requirement_plan(e, id)}
                                                    />
                                                    :
                                                    <Form.Control 
                                                    type='date'
                                                    onChange={(e) => handle_requirement_plan(e, id)}
                                                    />}
                                                </Form.Group>
                                            </td>
                                            <td >
                                                <Form.Group key={draft_rfp_released}>
                                                    {draft_rfp_released !== null && draft_rfp_released !== "1969-12-31T05:00:00.000Z"?
                                                    <Form.Control 
                                                    defaultValue={draft_rfp_released.replace(/T.+/, '')} 
                                                    type='date'
                                                    onChange={(e) => handle_draft_rfp_released(e, id)}
                                                    />
                                                    :
                                                    <Form.Control 
                                                    type='date'
                                                    onChange={(e) => handle_draft_rfp_released(e, id)}
                                                    />}
                                                </Form.Group>
                                            </td>
                                            <td >
                                                <Form.Group key={approved_by_acb}>
                                                    {approved_by_acb !== null && approved_by_acb !== "1969-12-31T05:00:00.000Z"?
                                                    <Form.Control 
                                                    defaultValue={approved_by_acb.replace(/T.+/, '')} 
                                                    type='date'
                                                    onChange={(e) => handle_approved_by_acb(e, id)}
                                                    />
                                                    :
                                                    <Form.Control 
                                                    type='date'
                                                    onChange={(e) => handle_approved_by_acb(e, id)}
                                                    />}
                                                </Form.Group>
                                            </td>
                                            <td >
                                                <Form.Group key={rfp_released}>
                                                    {rfp_released !== null && rfp_released !== "1969-12-31T05:00:00.000Z"?
                                                    <Form.Control 
                                                    defaultValue={rfp_released.replace(/T.+/, '')} 
                                                    type='date'
                                                    onChange={(e) => handle_rfp_released(e, id)}
                                                    />
                                                    :
                                                    <Form.Control 
                                                    type='date'
                                                    onChange={(e) => handle_rfp_released(e, id)}
                                                    />}
                                                </Form.Group>
                                            </td>
                                            <td >
                                                <Form.Group key={proposal_received}>
                                                    {proposal_received !== null && proposal_received !== "1969-12-31T05:00:00.000Z"?
                                                    <Form.Control 
                                                    defaultValue={proposal_received.replace(/T.+/, '')} 
                                                    type='date'
                                                    onChange={(e) => handle_proposal_received(e, id)}
                                                    />
                                                    :
                                                    <Form.Control 
                                                    type='date'
                                                    onChange={(e) => handle_proposal_received(e, id)}
                                                    />}
                                                </Form.Group>
                                            </td>
                                            <td >
                                                <Form.Group key={tech_eval_comp}>
                                                    {tech_eval_comp !== null && tech_eval_comp !== "1969-12-31T05:00:00.000Z"?
                                                    <Form.Control 
                                                    defaultValue={tech_eval_comp.replace(/T.+/, '')} 
                                                    type='date'
                                                    onChange={(e) => handle_tech_eval_comp(e, id)}
                                                    />
                                                    :
                                                    <Form.Control 
                                                    type='date'
                                                    onChange={(e) => handle_tech_eval_comp(e, id)}
                                                    />}
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group key={negotiation_comp}>
                                                    {negotiation_comp !== null && negotiation_comp !== "1969-12-31T05:00:00.000Z"?
                                                    <Form.Control 
                                                    defaultValue={negotiation_comp.replace(/T.+/, '')} 
                                                    type='date'
                                                    onChange={(e) => handle_negotiation_comp(e, id)}
                                                    />
                                                    :
                                                    <Form.Control 
                                                    type='date'
                                                    onChange={(e) => handle_negotiation_comp(e, id)}
                                                    />}
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group key={awarded}>
                                                    {awarded !== null && awarded !== "1969-12-31T05:00:00.000Z"?
                                                    <Form.Control 
                                                    defaultValue={awarded.replace(/T.+/, '')} 
                                                    type='date'
                                                    onChange={(e) => handle_awarded(e, id)}
                                                    />
                                                    :
                                                    <Form.Control 
                                                    type='date'
                                                    onChange={(e) => handle_awarded(e, id)}
                                                    />}
                                                </Form.Group>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Form>
                </ModalBody>
            </Modal>
        </ModalDialog>

        <NewContractModal open={timelineModal} contractId={contractId} getOpenTimelineModal={getOpenTimelineModal} setReload={setReload} />

        <Card className="card no-bot-pad">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Contract Status</span>
                        </Col>
                        { props.userRole === "Contractor" ? null : <Col style={{textAlign: 'right'}}>
                                {awarded ? <Link to={{pathname: "/awardedproject", state: {id:props.data}}} onClick={handleAward}><Button className='Button'>Award Project</Button></Link> : null}
                                <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
                                {contractId === 0 || data.length !== 0 ? null : <span><Button className='Button' onClick={()=>setTimelineModal(true)}>Add</Button></span>}
                            </Col>
                        }
                    </Row>
                </Container>
            </Card.Header>
            {data.length === 0 ? <div style={{marginBottom:"3%", marginTop:"3%"}}>No Contract Award Timeline</div> : <Table responsive striped bordered hover className="bg-light">
                <thead>
                    <tr>
                        <th>Timeline Status</th>
                        <th>Requirements Planning</th>
                        <th>Draft RFP Released</th>
                        <th>Approved at ABC</th>
                        <th>RFP Released</th>
                        <th>Proposal Received</th>
                        <th>Tech Eval Complete</th>
                        <th>Negotiations Complete</th>
                        <th>Awarded</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(({id, timeline_status, requirement_plan, draft_rfp_released, approved_by_acb, rfp_released, proposal_received, tech_eval_comp, negotiation_comp, awarded})=> (
                            <tr key = {id}>
                                <td>{timeline_status}</td>
                                {requirement_plan !== null && requirement_plan !== "1969-12-31T05:00:00.000Z" ? <td>{requirement_plan.replace(/-/g, '\/').replace(/T.+/, '')}</td>: <td>No Date</td>}
                                {draft_rfp_released !== null && draft_rfp_released !== "1969-12-31T05:00:00.000Z" ? <td>{draft_rfp_released.replace(/-/g, '\/').replace(/T.+/, '')}</td>: <td>No Date</td>}
                                {approved_by_acb !== null && approved_by_acb !== "1969-12-31T05:00:00.000Z" ? <td>{approved_by_acb.replace(/-/g, '\/').replace(/T.+/, '')}</td>: <td>No Date</td>}
                                {rfp_released !== null && rfp_released !== "1969-12-31T05:00:00.000Z" ? <td>{rfp_released.replace(/-/g, '\/').replace(/T.+/, '')}</td>: <td>No Date</td>}
                                {proposal_received !== null && proposal_received !== "1969-12-31T05:00:00.000Z" ? <td>{proposal_received.replace(/-/g, '\/').replace(/T.+/, '')}</td>: <td>No Date</td>}
                                {tech_eval_comp !== null && tech_eval_comp !== "1969-12-31T05:00:00.000Z" ? <td>{tech_eval_comp.replace(/-/g, '\/').replace(/T.+/, '')}</td>: <td>No Date</td>}
                                {negotiation_comp !== null && negotiation_comp !== "1969-12-31T05:00:00.000Z" ? <td>{negotiation_comp.replace(/-/g, '\/').replace(/T.+/, '')}</td>: <td>No Date</td>}
                                {awarded !== null && awarded !== "1969-12-31T05:00:00.000Z" ? <td>{awarded.replace(/-/g, '\/').replace(/T.+/, '')}</td>: <td>No Date</td>}
                            </tr>
                        ))
                    }
                </tbody>
            </Table>}
        </Card>
        </>
        
    );
}