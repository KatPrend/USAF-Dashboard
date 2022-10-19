import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import BarGraph from '../BarGraph';
import LineGraph from '../LineGraph';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AwardedProjectFundingDataExpenditure, AwardedProjectFundingDataObligation } from '../../pages/DummyData';

export const Funding = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    const location = useLocation();
    const {id} =location.state;

    useEffect(() => {
        // id.project_id
        axios.get(`/api/funds/obligation/${id}`).then(response =>{
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if(isLoading){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    // const fundingMap = data.map((expen_funding_date, expen_funding_type, epen_fiscal_year, expen_projected, expen_proj_total, expen_actual, expen_actual_total)) => {
    //     "date": {expen_funding_date},

    // });

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
                <Row>
                    <Col>
                    <Tabs className="Tabs">
                        <Tab tabClassName={"Tab"} eventKey="obligationBar" title="Obligation Bar Chart">
                            {/* AwardedProjectFundingDataObligation */}
                            {/* expen_funding_date, expen_funding_type, epen_fiscal_year, expen_projected, expen_proj_total, expen_actual, expen_actual_total) */}
                            <BarGraph data={data} dataKey1="Projected" dataKey2="Actual"/>
                        </Tab>
                        <Tab tabClassName={"Tab"} eventKey="obligationLine" title="Obligation Line Chart">
                            <LineGraph data={AwardedProjectFundingDataObligation} dataKey1="Projected Total" dataKey2="Actual Total"/>
                        </Tab>
                        <Tab tabClassName={"Tab"} eventKey="ExpenditureBar" title="Expenditure Bar Chart">
                            <BarGraph data={AwardedProjectFundingDataExpenditure} dataKey1="Projected" dataKey2="Actual"/>
                        </Tab>
                        <Tab tabClassName={"Tab"} eventKey="ExpenditureLine" title="Expenditure Line Chart">
                            <LineGraph data={AwardedProjectFundingDataExpenditure} dataKey1="Projected Total" dataKey2="Actual Total"/>
                        </Tab>
                    </Tabs>
                    </Col>
                </Row>
                    <Row>
                        <Col className="tableTitle">
                            Obligation Plan:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/*TODO: Create table when API can retreve data*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tableTitle">
                            Expenditure Plan:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/*TODO: Create table when API can retreve data*/}
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}