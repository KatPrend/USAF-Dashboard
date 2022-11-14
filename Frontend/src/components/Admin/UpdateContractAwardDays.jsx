import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Col, Form, Row} from 'react-bootstrap';
import "./admin.css";
import te from 'date-fns/esm/locale/te/index.js';

export const UpdateContractAwardDays = () => {

    const [isLoading, setLoading] = useState(true);
    const [draft, setDraft] = useState();
    const [approved, setApproved] = useState();
    const [released, setReleased] = useState();
    const [received, setReceived] = useState();
    const [tech, setTech] = useState();
    const [negotiation, setNegotiation] = useState();
    const [awarded, setAwarded] = useState();
    const [updated, setUpdated] = useState(false);
    
    // get breakpoints
    useEffect(() => {
        axios.get('/api/contract/daysAdded').then(response => {
            setDraft(response.data[0].draft_rfp_released);
            setApproved(response.data[0].approved_by_acb);
            setReleased(response.data[0].rfp_released);
            setReceived(response.data[0].proposal_received);
            setTech(response.data[0].tech_eval_comp);
            setNegotiation(response.data[0].negotiation_comp);
            setAwarded(response.data[0].awarded);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    const updateDays = () => {

        axios.put('/api/contract/updateDaysAdded', {
            draft_rfp_released: draft,
            approved_by_acb: approved,
            rfp_released: released,
            proposal_received: received,
            tech_eval_comp: tech,
            negotiation_comp: negotiation,
            awarded: awarded
        })
        .then(function(res) {
            setUpdated(true);
        });
    }

    return (
        <div>
            <h4>Update Days Between Contract Award Milestones</h4>
            <h6 style={{marginTop:"5%", marginBottom:"2%"}}>Requirements Planning {"\u2192"} Draft RFP Released:</h6>
            <Form className="mx-auto" style={{width: '30%'}}>
                    <Form.Group className='d-flex justify-content-between'>
                        <Form.Label column sm={3}>Days:</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="number" min='0' max='100' value={draft} onChange={(event) => {setDraft(event.target.value)}} />
                        </Col>
                        <Col sm={6}>
                            <Form.Control min='0' max='1000' step='1' value={draft} onChange={(event) => {setDraft(event.target.value)}} type="range" />
                        </Col>
                    </Form.Group>
            </Form>
            <h6 style={{marginTop:"4%", marginBottom:"2%"}}> Draft RFP Released {"\u2192"} Approved at ACB:</h6>
            <Form className="mx-auto" style={{width: '30%'}}>
                    <Form.Group className='d-flex justify-content-between'>
                        <Form.Label column sm={3}>Days:</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="number" min='0' max='100' value={approved} onChange={(event) => {setApproved(event.target.value)}} />
                        </Col>
                        <Col sm={6}>
                            <Form.Control min='0' max='1000' step='1' value={approved} onChange={(event) => {setApproved(event.target.value)}} type="range" />
                        </Col>
                    </Form.Group>
            </Form>
            <h6 style={{marginTop:"4%", marginBottom:"2%"}}>Approved at ACB {"\u2192"} RFP Released:</h6>
            <Form className="mx-auto" style={{width: '30%'}}>
                    <Form.Group className='d-flex justify-content-between'>
                        <Form.Label column sm={3}>Days:</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="number" min='0' max='100' value={released} onChange={(event) => {setReleased(event.target.value)}} />
                        </Col>
                        <Col sm={6}>
                            <Form.Control min='0' max='1000' step='1' value={released} onChange={(event) => {setReleased(event.target.value)}} type="range" />
                        </Col>
                    </Form.Group>
            </Form>
            <h6 style={{marginTop:"4%", marginBottom:"2%"}}>RFP Released {"\u2192"} Proposal Received:</h6>
            <Form className="mx-auto" style={{width: '30%'}}>
                    <Form.Group className='d-flex justify-content-between'>
                        <Form.Label column sm={3}>Days:</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="number" min='0' max='100' value={received} onChange={(event) => {setReceived(event.target.value)}} />
                        </Col>
                        <Col sm={6}>
                            <Form.Control min='0' max='1000' step='1' value={received} onChange={(event) => {setReceived(event.target.value)}} type="range" />
                        </Col>
                    </Form.Group>
            </Form>
            <h6 style={{marginTop:"4%", marginBottom:"2%"}}>Proposal Received {"\u2192"} Tech Eval Complete:</h6>
            <Form className="mx-auto" style={{width: '30%'}}>
                    <Form.Group className='d-flex justify-content-between'>
                        <Form.Label column sm={3}>Days:</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="number" min='0' max='100' value={tech} onChange={(event) => {setTech(event.target.value)}} />
                        </Col>
                        <Col sm={6}>
                            <Form.Control min='0' max='1000' step='1' value={tech} onChange={(event) => {setTech(event.target.value)}} type="range" />
                        </Col>
                    </Form.Group>
            </Form>
            <h6 style={{marginTop:"4%", marginBottom:"2%"}}>Tech Eval Complete {"\u2192"} Negotiations Complete:</h6>
            <Form className="mx-auto" style={{width: '30%'}}>
                    <Form.Group className='d-flex justify-content-between'>
                        <Form.Label column sm={3}>Days:</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="number" min='0' max='100' value={negotiation} onChange={(event) => {setNegotiation(event.target.value)}} />
                        </Col>
                        <Col sm={6}>
                            <Form.Control min='0' max='1000' step='1' value={negotiation} onChange={(event) => {setNegotiation(event.target.value)}} type="range" />
                        </Col>
                    </Form.Group>
            </Form>
            <h6 style={{marginTop:"4%", marginBottom:"2%"}}>Negotiations Complete {"\u2192"} Awarded:</h6>
            <Form className="mx-auto" style={{width: '30%'}}>
                    <Form.Group className='d-flex justify-content-between'>
                        <Form.Label column sm={3}>Days:</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="number" min='0' max='100' value={awarded} onChange={(event) => {setAwarded(event.target.value)}} />
                        </Col>
                        <Col sm={6}>
                            <Form.Control min='0' max='1000' step='1' value={awarded} onChange={(event) => {setAwarded(event.target.value)}} type="range" />
                        </Col>
                    </Form.Group>
            </Form>
            <Button style={{marginTop:"7%", marginBottom:"2%", display:"block"}} className='submit-new-project admin mx-auto' onClick={updateDays}>Update Breakpoints</Button>
            {updated ? <span style={{marginTop:"1%", marginBottom:"2%"}}>Successfully updated!</span> : null}
        </div>
    );
}