import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Dependencies } from '../components/Awarded/Dependencies';
import { Documents } from '../components/Awarded/Documents';
import { FinManagement } from '../components/Awarded/FinManagement';
import { Funding } from '../components/Awarded/Funding';
import { IPT } from '../components/Awarded/IPT';
import { ProjectData } from '../components/Awarded/ProjectData';
import { ProjectSchedule } from '../components/Awarded/ProjectSchedule';
import { NavB } from '../components/NavB';
import './page.css';
import BarGraph from '../components/BarGraph';
import LineGraph from '../components/LineGraph';
import { FinanciaData } from './DummyData';



//Move this ish to the component

function AwardedProject(){

    return(
        <body className="lightBlue">
            <NavB />


            <Container className='top-Padding'>
                <Row>
                    <Col>
                        <ProjectData />
                    </Col>
                    <Col>
                        <Documents />
                    </Col>
                    <Col>
                        <ProjectSchedule />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <Col>
                                    <IPT />
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <Dependencies />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <FinManagement />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
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

                        <Funding />
                    </Col>
                </Row>
            </Container>
        </body>
    );
}

export default AwardedProject;