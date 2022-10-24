import React from 'react';
import './page.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavB } from '../components/NavB';
import { ProjectData } from '../components/Pre-Award/ProjectData';
import { IPT } from '../components/Pre-Award/IPT';
import { ContractStatus } from '../components/Pre-Award/ContractStatus';
import { FundingData } from '../components/Pre-Award/FundingData';
import { useLocation } from 'react-router-dom';
import { AwardedModal } from '../components/Pre-Award/AwardedModal';

function PreAwardProject(){
    const location = useLocation();
    const {id} = location.state;
    
    return(
        <div className="lightBlue">
            <NavB />
            <Container className='top-Padding'>
                <Row>
                    <Col>
                        <ProjectData data={id}/>
                    </Col>

                    <Col>                      
                        <IPT data={id}/>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <ContractStatus data={id}/>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <FundingData data={id}/>
                    </Col>
                </Row>
            </Container>
            <Button className='submit-new-project preaward'>Award Project</Button>
        </div>
    );
}

export default PreAwardProject;