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
                        <Funding />
                    </Col>
                </Row>
            </Container>
        </body>
    );
}

export default AwardedProject;