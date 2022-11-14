import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Form, Alert} from 'react-bootstrap';
import "./admin.css";

export const UpdateFinancialBreakpoints = () => {

    const [isLoading, setLoading] = useState(true);
    const [redOblBreak, setRedOblBreak] = useState();
    const [yellowOblBreak, setYellowOblBreak] = useState();
    const [redExpBreak, setRedExpBreak] = useState();
    const [yellowExpBreak, setYellowExpBreak] = useState();
    const [showAlert, setShowAlert] = useState(false);
    
    // get breakpoints
    useEffect(() => {
        axios.get('/api/finSum/').then(response => {
            setYellowOblBreak(response.data[0].obli_yellow_breakpoint);
            setYellowExpBreak(response.data[0].expen_yellow_breakpoint);
            setRedOblBreak(response.data[0].obli_red_breakpoint);
            setRedExpBreak(response.data[0].expen_red_breakpoint);
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

        axios.put('/api/finSum', {
            obli_yellow_breakpoint: yellowOblBreak,
            obli_red_breakpoint: redOblBreak,
            expen_yellow_breakpoint: yellowExpBreak,
            expen_red_breakpoint: redExpBreak
        });
        
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
                            <Form.Control type="number" min='0' max='100' value={redOblBreak} onChange={(event) => {setRedOblBreak(event.target.value)}} />
                            <Form.Control min='0' max='100' step='.5' value={redOblBreak} onChange={(event) => {setRedOblBreak(event.target.value)}} type="range" />
                        </div>  
                        <div>
                            <Form.Label>"Yellow" Percentage</Form.Label>
                            <Form.Control type="number" min='0' max='100' value={yellowOblBreak} onChange={(event) => {setYellowOblBreak(event.target.value)}} />
                            <Form.Control min='0' max='100' step='.5' value={yellowOblBreak} onChange={(event) => {setYellowOblBreak(event.target.value)}} type="range" />
                        </div>
                    </Form.Group>
            </Form>
            <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Expenditure Breakpoints:</h5>
            <Form className="mx-auto" style={{width: '50%'}}>
                    <Form.Group className='d-flex justify-content-between'>
                        <div>
                            <Form.Label>"Red" Percentage</Form.Label>
                            <Form.Control type="number" min='0' max='100' value={redExpBreak} onChange={(event) => {setRedExpBreak(event.target.value)}} />
                            <Form.Control min='0' max='100' step='.5' value={redExpBreak} onChange={(event) => {setRedExpBreak(event.target.value)}} type="range" />
                        </div>  
                        <div>
                            <Form.Label>"Yellow" Percentage</Form.Label>
                            <Form.Control type="number" min='0' max='100' value={yellowExpBreak} onChange={(event) => {setYellowExpBreak(event.target.value)}} />
                            <Form.Control min='0' max='100' step='.5' value={yellowExpBreak} onChange={(event) => {setYellowExpBreak(event.target.value)}} type="range" />
                        </div>
                    </Form.Group>
            </Form>
            <Button className='submit-new-project admin mx-auto' onClick={updateBreakpoints}>Update Breakpoints</Button>
        </div>
    );
}