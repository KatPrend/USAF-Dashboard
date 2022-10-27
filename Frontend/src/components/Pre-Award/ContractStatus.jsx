import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Table, Modal, ModalBody, ButtonGroup, ModalDialog, } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import axios from 'axios';
import { format } from 'date-fns';



export const ContractStatus = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        axios.get(`/api/contract/contractawardtimeline/${props.data}`).then(response =>{
            setData(response.data);
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
                                <h3>Contract Status Edit</h3>
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


        <Card className="card no-bot-pad">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Contract Status</span>
                        </Col>
                        <Col style={{textAlign: 'right'}}>
                            <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            <Table striped bordered hover className="bg-light">
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
                                {requirement_plan != null ? <td>{format(new Date(requirement_plan), 'yyyy/MM/dd')}</td>: <td>No Date</td>}
                                {draft_rfp_released != null ? <td>{format(new Date(draft_rfp_released), 'yyyy/MM/dd')}</td>: <td>No Date</td>}
                                {approved_by_acb != null ? <td>{format(new Date(approved_by_acb), 'yyyy/MM/dd')}</td>: <td>No Date</td>}
                                {rfp_released != null ? <td>{format(new Date(rfp_released), 'yyyy/MM/dd')}</td>: <td>No Date</td>}
                                {proposal_received != null ? <td>{format(new Date(proposal_received), 'yyyy/MM/dd')}</td>: <td>No Date</td>}
                                {tech_eval_comp != null ? <td>{format(new Date(tech_eval_comp), 'yyyy/MM/dd')}</td>: <td>No Date</td>}
                                {negotiation_comp != null ? <td>{format(new Date(negotiation_comp), 'yyyy/MM/dd')}</td>: <td>No Date</td>}
                                {awarded != null ? <td>{format(new Date(awarded), 'yyyy/MM/dd')}</td>: <td>No Date</td>}
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Card>
        </>
        
    );
}