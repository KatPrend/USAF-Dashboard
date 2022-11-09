import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Tabs, Tab, Modal, ModalBody, ButtonGroup, ModalDialog } from 'react-bootstrap';
import BarGraph from '../../BarGraph';
import LineGraph from '../../LineGraph';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {ObligationFundingDataTable, ExpenditureFundingDataTable, ObligationFundingDataTableEditable, ExpenditureFundingDataTableEditable} from './FundingDataTable';
import {ApprovedFundingTable, ApprovedFundingTableEditable} from '../../ApprovedFundingTable';
import { AwardedProjectFundingDataObligation, ApprovedFundingData } from '../../../pages/DummyData';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import '../../../pages/page.css';

export const Funding = (props) => {
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [expen_data, setExpenData] = useState();
    const [obligation_data, setObligationData] = useState();
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    const location = useLocation();
    const {id} =location.state;

    useEffect(() => {
        // id.project_id
        axios.get(`/api/expenditure/${props.projectId}`).then(response =>{
            setExpenData(response.data);
            setLoading1(false);
        });
        return () => {
            setExpenData({}); // This worked for me
          };
    }, []);

    useEffect(() => {
        axios.get(`/api/obligation/${props.projectId}`).then(response =>{
            setObligationData(response.data);
            setLoading2(false);
        });
        return () => {
            setObligationData({}); // This worked for me
          };
    }, []);
    
    if(isLoading1 || isLoading2){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    // const fundingMap = data.map((expen_funding_date, expen_funding_type, epen_fiscal_year, expen_projected, expen_proj_total, expen_actual, expen_actual_total)) => {
    //     "date": {expen_funding_date},

    // });

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
                                <ApprovedFundingTableEditable data={ApprovedFundingData} projectId={props.projectId}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontWeight: 'bold', textAlign: 'left'}}>Obligation Plan:</Col>
                        </Row>
                        <Row>
                            <Col>
                                <ObligationFundingDataTableEditable data={AwardedProjectFundingDataObligation}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontWeight: 'bold', textAlign: 'left'}}>Expenditure Plan</Col>
                        </Row>
                        <Row>
                            <Col>
                                {/* AwardedProjectFundingDataExpenditure */}
                                <ExpenditureFundingDataTableEditable data={expen_data}/>
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
                            <span><Button className='Button' onClick={()=>setModalIsOpen(true)} >Edit</Button></span>
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                        
                        <Tabs className="Tabs">
                            <Tab tabClassName={"Tab"} eventKey="obligationBar" title="Obligation Bar Chart">
                                {/* AwardedProjectFundingDataObligation */}
                                {/* expen_funding_date, expen_funding_type, epen_fiscal_year, expen_projected, expen_proj_total, expen_actual, expen_actual_total) */}
                                <BarGraph data={obligation_data} dataKey1="Projected" dataKey2="Actual"/>
                            </Tab>
                            {/* AwardedProjectFundingDataObligation */}
                            <Tab tabClassName={"Tab"} eventKey="obligationLine" title="Obligation Line Chart">
                                <LineGraph data={obligation_data} dataKey1="Projected Total" dataKey2="Actual Total"/>
                            </Tab>
                            {/* AwardedProjectFundingDataExpenditure */}
                            <Tab tabClassName={"Tab"} eventKey="ExpenditureBar" title="Expenditure Bar Chart">
                                <BarGraph data={expen_data} dataKey1="Projected" dataKey2="Actual"/>
                            </Tab>
                            {/* AwardedProjectFundingDataExpenditure */}
                            <Tab tabClassName={"Tab"} eventKey="ExpenditureLine" title="Expenditure Line Chart">
                                <LineGraph data={expen_data} dataKey1="Projected Total" dataKey2="Actual Total"/>
                            </Tab>
                        </Tabs>
                        
                        </Col>
                    </Row>
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
                            <ApprovedFundingTable data={ApprovedFundingData} projectId={props.projectId}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tableTitle">
                            Obligation Plan:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/*AwardedProjectFundingDataObligation */}
                            <ObligationFundingDataTable data={obligation_data}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tableTitle">
                            Expenditure Plan:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* AwardedProjectFundingDataExpenditure */}
                            <ExpenditureFundingDataTable data={expen_data}/>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
        </>
        
    );
}