import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Tabs, Tab, Modal, ModalBody, ButtonGroup, ModalDialog } from 'react-bootstrap';
import BarGraph from '../../BarGraph';
import LineGraph from '../../LineGraph';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {ObligationFundingDataTable, ExpenditureFundingDataTable, ObligationFundingDataTableEditable, ExpenditureFundingDataTableEditable} from './FundingDataTable';
import {ApprovedFundingTable, ApprovedFundingTableEditable} from '../ApprovedFundingTable';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import '../../../pages/page.css';
import { format } from 'date-fns';

export const Funding = (props) => {
    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [isLoading3, setLoading3] = useState(true);
    const [isLoading4, setLoading4] = useState(true);
    const [expen_data, setExpenData] = useState();
    const [obligation_data, setObligationData] = useState();
    const [approved_data, setApprovedData] = useState();
    const [est_data, setEstData] = useState();
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [reload, setReload] = useState(false);

    const location = useLocation();
    const {id} =location.state;

    useEffect(() => {
        // id.project_id
        axios.get(`/api/expenditure/getExpen/${props.projectId}`).then(response =>{
            setExpenData(response.data);
            setLoading1(false);
        });
        return () => {
            setExpenData({}); // This worked for me
          };
    }, []);

    useEffect(() => {
        axios.get(`/api/obligation/getObli/${props.projectId}`).then(response =>{
            setObligationData(response.data);
            setLoading2(false);
        });
        return () => {
            setObligationData({}); // This worked for me
          };
    }, []);

    useEffect(() => {
        axios.get(`/api/approved/${props.projectId}`).then(response =>{
            setApprovedData(response.data);
            setLoading3(false);
        });
        return () => {
            setApprovedData({}); // This worked for me
        }
    }, []);

    useEffect(() => {
        axios.get(`/api/approved/getEstimates/${props.projectId}`).then(response =>{
            setEstData(response.data);
            setLoading4(false);
        });
        return () => {
            setObligationData({}); // This worked for me
          };
    }, []);
    
    if(isLoading1 || isLoading2 || isLoading3 || isLoading4){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    // const fundingMap = data.map((expen_funding_date, expen_funding_type, epen_fiscal_year, expen_projected, expen_proj_total, expen_actual, expen_actual_total)) => {
    //     "date": {expen_funding_date},

    // });

    if(reload){
        axios.get(`/api/expenditure/getExpen/${props.projectId}`).then(response =>{
            setExpenData(response.data);
            setLoading1(false);
        });

        axios.get(`/api/obligation/getObli/${props.projectId}`).then(response =>{
            setObligationData(response.data);
            setLoading2(false);
        });
        
        axios.get(`/api/approved/${props.projectId}`).then(response =>{
            setApprovedData(response.data);
            setLoading3(false);
        });

        axios.get(`/api/approved/getEstimates/${props.projectId}`).then(response =>{
            setEstData(response.data);
            setLoading4(false);
        });

        setReload(false)
    }

    function formatDataForCharts(data){
        var retVal = [];
        var temp = {};

        data.forEach((info) => {
            temp.id = info.id;
            temp.Actual = info.Actual;
            temp["Actual Total"] = info["Actual Total"];
            temp.Projected = info.Projected;
            temp["Projected Total"] = info["Projected Total"];
            temp.date = format(new Date(info.date), 'MM/dd/yyyy');
            retVal.push(temp);
            temp = {};
        })
            
        return retVal;
    }

    const handleCloseModel = (e) => {
        setReload(true);
        setModalIsOpen(false);
    }

    const getReload = (rel) => {
        setReload(rel);
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
                                <ApprovedFundingTableEditable data={approved_data} id={props.projectId} getReload={getReload}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontWeight: 'bold', textAlign: 'left'}}>Obligation Plan:</Col>
                        </Row>
                        <Row>
                            <Col>
                                <ObligationFundingDataTableEditable data={obligation_data} id={props.projectId} getReload={getReload}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontWeight: 'bold', textAlign: 'left'}}>Expenditure Plan</Col>
                        </Row>
                        <Row>
                            <Col>
                                <ExpenditureFundingDataTableEditable data={expen_data} id={props.projectId}/>
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
                                <BarGraph data={formatDataForCharts(obligation_data)} dataKey1="Projected" dataKey2="Actual"/>
                            </Tab>
                            <Tab tabClassName={"Tab"} eventKey="obligationLine" title="Obligation Line Chart">
                                <LineGraph data={formatDataForCharts(obligation_data)} dataKey1="Projected Total" dataKey2="Actual Total"/>
                            </Tab>
                            <Tab tabClassName={"Tab"} eventKey="ExpenditureBar" title="Expenditure Bar Chart">
                                <BarGraph data={formatDataForCharts(expen_data)} dataKey1="Projected" dataKey2="Actual"/>
                            </Tab>
                            <Tab tabClassName={"Tab"} eventKey="ExpenditureLine" title="Expenditure Line Chart">
                                <LineGraph data={formatDataForCharts(expen_data)} dataKey1="Projected Total" dataKey2="Actual Total"/>
                            </Tab>
                        </Tabs>
                        </Col>
                    </Row>
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
                            <ApprovedFundingTable data={approved_data} projectId={props.projectId}/>
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