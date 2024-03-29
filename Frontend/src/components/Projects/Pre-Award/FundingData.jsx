import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Modal, ModalBody, ButtonGroup, ModalDialog} from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ApprovedFundingData } from "../../../pages/DummyData";
import {ApprovedFundingTable, ApprovedFundingTableEditable} from "../ApprovedFundingTable";
import {FundingDataTable, FundingDataTableEditable} from "./FundingDataTable";
import ModalHeader from "react-bootstrap/esm/ModalHeader";


export const FundingData = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [isLoading3, setLoading3] = useState(true);
    const [obligation_data, setObligationData] = useState();
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [est_data, setEstData] = useState();
    const [approved_data, setApprovedData] = useState();
    const [reload, setReload] = useState(false);


    const location = useLocation();
    const {id} =location.state;

    useEffect(() => {
        axios.get(`/api/obligation/getObli/${props.data}`).then(response =>{
            setObligationData(response.data);
            setLoading(false);
        });
        return () => {
            setObligationData({}); // This worked for me
          };
    }, []);


    useEffect(() => {
        axios.get(`/api/approved/${props.data}`).then(response =>{
            setApprovedData(response.data);
            setLoading2(false);
        });
        return () => {
            setApprovedData({}); // This worked for me
        }
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
    
    if(isLoading || isLoading2 || isLoading3){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    if(reload){

        axios.get(`/api/obligation/getObli/${props.data}`).then(response =>{
            setObligationData(response.data);
            setLoading(false);
        });
        
        axios.get(`/api/approved/${props.data}`).then(response =>{
            setApprovedData(response.data);
            setLoading2(false);
        });

        axios.get(`/api/approved/getEstimates/${props.data}`).then(response =>{
            setEstData(response.data);
            setLoading3(false);
        });

        setReload(false)
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
                                <h3>Funding Data Edit</h3>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button' onClick={handleCloseModel}>Done</Button>
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
                                <ApprovedFundingTableEditable data={approved_data} id={props.data}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontWeight: 'bold', textAlign: 'left'}}>Obligation Plan:</Col>
                        </Row>
                        <Row>
                            <Col>
                                <FundingDataTableEditable data={obligation_data} id={props.data}/>
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
                    <Row style={{fontWeight: 'bold', textAlign: 'left', marginTop:"3%", marginBottom:"3%"}}>
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
                            <ApprovedFundingTable data={approved_data}/>
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