import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Modal, ModalBody, ButtonGroup, ModalDialog} from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ApprovedFundingData } from "../../../pages/DummyData";
import {ApprovedFundingTable, ApprovedFundingTableEditable} from "../../ApprovedFundingTable";
import {FundingDataTable, FundingDataTableEditable} from "./FundingDataTable";
import ModalHeader from "react-bootstrap/esm/ModalHeader";


export const FundingData = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [obligation_data, setObligationData] = useState();
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading3, setLoading3] = useState(true);
    const [est_data, setEstData] = useState();

    const location = useLocation();
    const {id} =location.state;

    useEffect(() => {
        axios.get(`/api/obligation/obligation_table/${props.data}`).then(response =>{
            setObligationData(response.data);
            setLoading(false);
        });
        return () => {
            setObligationData({}); // This worked for me
          };
    }, []);

    useEffect(() => {
        axios.get(`/api/approved/getEstimates/${props.data}`).then(response =>{
            setEstData(response.data);
            setLoading3(false);
        });
        return () => {
            setObligationData({}); // This worked for me
          };
    }, []);
    
    if(isLoading || isLoading3){
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
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <Container>
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
                                Independent Cost Estimate: $ {est_data.map(({ind_gov_est}) => ind_gov_est)}
                            </span>
                        </Col>
                        <Col>
                            <span>
                                Projected Contract Value: $ {est_data.map(({contract_value}) => contract_value)}
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