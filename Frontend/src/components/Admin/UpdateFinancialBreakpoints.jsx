import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row, Alert} from 'react-bootstrap';
import "./admin.css";

export const UpdateFinancialBreakpoints = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [redOblBreak, setRedOblBreak] = useState(20);
    const [yellowOblBreak, setYellowOblBreak] = useState(10);
    const [redExpBreak, setRedExpBreak] = useState(20);
    const [yellowExpBreak, setYellowExpBreak] = useState(10);
    const [showAlert, setShowAlert] = useState(false);
    // get breakpoints
    // TODO: find BE api call
    useEffect(() => {
        axios.get('/api/fundingType/').then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    const updateBreakpoints = () => {
        if (redOblBreak < yellowOblBreak || redExpBreak < yellowExpBreak) {
            setShowAlert(true);
            return;
        }

        // TODO: do some axios stuff once endpoint is set up
    }


    return (
        <div>
            <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>Error: Invalid Input</Alert.Heading>
                <p>
                    "Red" Breakpoint must be greater than "Yellow" Breakpoint.
                </p>
            </Alert>
            <h4>Update Financial Breakpoints</h4>
            <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Obligation  Breakpoints:</h5>
            <Form className="mx-auto" style={{width: '50%'}}>
                    <Form.Group className='d-flex justify-content-between'>
                        <div>
                            <Form.Label>"Red" Percentage</Form.Label>
                            <Form.Control type="text" min='0' max='100' value={redOblBreak} onChange={(event) => {setRedOblBreak(event.target.value)}} />
                            <Form.Control min='0' max='100' step='.5' value={redOblBreak} onChange={(event) => {setRedOblBreak(event.target.value)}} type="range" />
                        </div>  
                        <div>
                            <Form.Label>"Yellow" Percentage</Form.Label>
                            <Form.Control type="text" min='0' max='100' value={yellowOblBreak} onChange={(event) => {setYellowOblBreak(event.target.value)}} />
                            <Form.Control min='0' max='100' step='.5' value={yellowOblBreak} onChange={(event) => {setYellowOblBreak(event.target.value)}} type="range" />
                        </div>
                    </Form.Group>
            </Form>
            <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Expenditure Breakpoints:</h5>
            <Form className="mx-auto" style={{width: '50%'}}>
                    <Form.Group className='d-flex justify-content-between'>
                        <div>
                            <Form.Label>"Red" Percentage</Form.Label>
                            <Form.Control type="text" min='0' max='100' value={redExpBreak} onChange={(event) => {setRedExpBreak(event.target.value)}} />
                            <Form.Control min='0' max='100' step='.5' value={redExpBreak} onChange={(event) => {setRedExpBreak(event.target.value)}} type="range" />
                        </div>  
                        <div>
                            <Form.Label>"Yellow" Percentage</Form.Label>
                            <Form.Control type="text" min='0' max='100' value={yellowExpBreak} onChange={(event) => {setYellowExpBreak(event.target.value)}} />
                            <Form.Control min='0' max='100' step='.5' value={yellowExpBreak} onChange={(event) => {setYellowExpBreak(event.target.value)}} type="range" />
                        </div>
                    </Form.Group>
            </Form>
            <Button className='submit-new-project admin mx-auto' onClick={updateBreakpoints}>Update Breakpoints</Button>
        </div>
    );
}