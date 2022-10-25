import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Dependencies } from '../components/Awarded/Dependencies';
import { Documents } from '../components/Awarded/Documents';
import { FinManagement } from '../components/Awarded/FinManagement';
import { Funding } from '../components/Awarded/Funding';
import { IPT } from '../components/Pre-Award/IPT';
import { ProjectData } from '../components/Pre-Award/ProjectData';
import { ProjectSchedule } from '../components/Awarded/ProjectSchedule';
import { NavB } from '../components/NavB';
import './page.css';
import { useLocation } from 'react-router-dom';



//Move this ish to the component

function AwardedProject(){
    const location = useLocation();
    const {id} = location.state;

    const [userid, setUserid] = useState(0);

    const getUserId = (uid) => {
        setUserid(uid);
    }

    return(
        <div className="lightBlue">
            <NavB getUserId={getUserId}/>


            <Container className='top-Padding'>
                <Row>
                    <Col>
                        <ProjectData data={id}/>
                    </Col>
                    <Col>
                        <IPT data={id}/>
                    </Col>
                    <Col>
                        <Dependencies />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Funding data={id}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <ProjectSchedule data={id}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AwardedProject;