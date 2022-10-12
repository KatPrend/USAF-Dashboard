import React from 'react';
import { Button, Card, Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import BarGraph from '../BarGraph';
import LineGraph from '../LineGraph';
import { AwardedProjectFundingDataExpenditure, AwardedProjectFundingDataObligation } from '../../pages/DummyData';

export const Funding = () => {
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
                            <BarGraph data={AwardedProjectFundingDataObligation} dataKey1="Projected" dataKey2="Actual"/>
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