import React from 'react';
import './page.css';
import { Col, Container, Row } from 'react-bootstrap';
import { NavB } from '../components/NavB';
import { ProjectData } from '../components/Pre-Award/ProjectData';
import { IPT } from '../components/Pre-Award/IPT';
import { ContractStatus } from '../components/Pre-Award/ContractStatus';
import { FundingData } from '../components/Pre-Award/FundingData';

function PreAwardProject(){

    return(
        <body className="lightBlue">
            <NavB />
            <Container className='top-Padding'>
                <Row>
                    <Col>
                        <ProjectData />
                    </Col>

                    <Col>
                        <IPT />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <ContractStatus />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <FundingData />
                    </Col>
                </Row>
            </Container>
        </body>
    );
}

export default PreAwardProject;