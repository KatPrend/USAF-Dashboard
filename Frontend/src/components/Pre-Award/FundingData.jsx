import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Modal, ModalBody, ButtonGroup, ModalDialog, Form} from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AwardedProjectFundingDataObligation, ApprovedFundingData } from "../../pages/DummyData";
import {ApprovedFundingTable, ApprovedFundingTableEditable} from "../ApprovedFundingTable";
import {FundingDataTable, FundingDataTableEditable} from "./FundingDataTable";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { SummaryIcon } from "../SummaryIcon";


export const FundingData = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [obligation_data, setObligationData] = useState();
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    const location = useLocation();
    const {id} =location.state;

    useEffect(() => {
        axios.get(`/api/funds/obligation_table/${props.data}`).then(response =>{
            setObligationData(response.data);
            setLoading(false);
        });
        return () => {
            setObligationData({}); // This worked for me
          };
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
                                <h3>Funding Data Edit</h3>
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
                        <Row>
                            <Col style={{fontWeight: 'bold', textAlign: 'left'}}>
                                Independent Cost Estimate:
                                <Form>
                                    <Form.Control defaultValue={"temp"}/>
                                </Form>
                            </Col>
                            <Col style={{fontWeight: 'bold', textAlign: 'left'}}>
                                Projected Contract Value:
                                <Form>
                                    <Form.Control defaultValue={"temp"}/>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontWeight: 'bold', textAlign: 'left'}}>Approved Funding:</Col>
                        </Row>
                        <Row>
                            <Col>
                                <ApprovedFundingTableEditable data={ApprovedFundingData}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontWeight: 'bold', textAlign: 'left'}}>Obligation Plan:</Col>
                        </Row>
                        <Row>
                            <Col>
                                <FundingDataTableEditable data={obligation_data}/>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>
        </ModalDialog>


        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Funding Data</span>
                        </Col>
                        <Col style={{textAlign: 'right'}}>
                            <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
                        </Col>
                    </Row>
                </Container> 
                </Card.Header>
            <Card.Body>
                <Container>
                    <Row style={{fontWeight: 'bold', textAlign: 'left'}}>
                        <Col>
                            <span>
                                Independent Cost Estimate:
                            </span>
                        </Col>
                        <Col>
                            <span>
                                Projected Contract Value:
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tableTitle">
                            Approved Funding:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ApprovedFundingTable data={ApprovedFundingData}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tableTitle">
                            Projected Obligation Plan:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* AwardedProjectFundingDataObligation */}
                            {/* obligation_data */}
                            <FundingDataTable data={obligation_data}/>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
        </>
        
    );
}