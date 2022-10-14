import React from 'react';
import './page.css';
import { Col, Container, Row } from 'react-bootstrap';
import { NavB } from '../components/NavB';
import { ProjectData } from '../components/Pre-Award/ProjectData';
import { IPT } from '../components/Pre-Award/IPT';
import { ContractStatus } from '../components/Pre-Award/ContractStatus';
import { FundingData } from '../components/Pre-Award/FundingData';
import { useLocation } from 'react-router-dom';

function PreAwardProject(){
    const location = useLocation();
    const {id} = location.state;
    console.log("on preawardedpage" + id.project_id);
    return(
        <body className="lightBlue">
            <NavB />
            <Container className='top-Padding'>
                <Row>
                    <Col>
                        <ProjectData />
                    </Col>

                    <Col>
                    {/* Do I have to do something here to send project_id to IPT page */}
                        
                        <IPT data={id.project_id}/>
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