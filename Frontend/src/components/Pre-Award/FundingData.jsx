import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AwardedProjectFundingDataObligation, ApprovedFundingData } from "../../pages/DummyData";
import ApprovedFundingTable from "../ApprovedFundingTable";
import FundingDataTable from "./FundingDataTable";


export const FundingData = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [obligation_data, setObligationData] = useState();

    const location = useLocation();
    const {id} =location.state;

    console.log(props.data);

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

    console.log(obligation_data);

    return (
        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Funding Data</span>
                        </Col>
                        <Col style={{textAlign: 'right'}}>
                            <span><Button className='Button'>Edit</Button></span>
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
                        <Col>
                            <div className='badge'> </div>
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
    );
}