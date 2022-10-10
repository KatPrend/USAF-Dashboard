import React from 'react';
import { Button, Card, Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import BarGraph from '../BarGraph';
import LineGraph from '../LineGraph';
import { FinanciaData } from '../../pages/DummyData';

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
                        <Tab className="Tab" eventKey="obligationBar" title="Obligation Bar Chart">
                            <BarGraph data={FinanciaData} dataKey1="expected" dataKey2="actual"/>
                        </Tab>
                        <Tab className="Tab" eventKey="obligationLine" title="Obligation Line Chart">
                            <LineGraph data={FinanciaData} dataKey1="expected" dataKey2="actual"/>
                        </Tab>
                        <Tab className="Tab" eventKey="ExpenditureBar" title="Expenditure Bar Chart">
                            <BarGraph data={FinanciaData} dataKey1="expected" dataKey2="actual"/>
                        </Tab>
                        <Tab className="Tab" eventKey="ExpenditureLine" title="Expenditure Line Chart">
                            <LineGraph data={FinanciaData} dataKey1="expected" dataKey2="actual"/>
                        </Tab>
                    </Tabs>
                    </Col>
                </Row>
                    <Row>
                        <Col className="tableTitle">
                            Projected Obligation Plan:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/*TODO: Create table when API can retreve data*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tableTitle">
                            Actual Obligation Plan:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/*TODO: Create table when API can retreve data*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tableTitle">
                            Projected Expenditure Plan:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/*TODO: Create table when API can retreve data*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="tableTitle">
                            Actual Expenditure Plan:
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