import React, { useState, useEffect } from 'react';
import axios from "axios";
import './page.css';
import {Link} from 'react-router-dom';
import { Col, Container, Button, Row, Table } from 'react-bootstrap';
import { NavB } from '../components/NavB';
import { DepSum } from '../components/Summaries/DepSum';
import { FinSum } from '../components/Summaries/FinSum';
import { SchedSum } from '../components/Summaries/SchedSum';


function renderContent(contractStatus, projectId, projectName) {
    if(contractStatus === "Awarded"){
        return <Link to={{ 
            pathname: "/awardedproject", 
            state: {id:projectId} // your data array of objects
        }}
      >{projectName}</Link>
    }
    else if (contractStatus === "Pre-Award"){
        return <Link to={{ 
            pathname: "/preawardproject", 
            state: {id:projectId} // your data array of objects
        }}
      >{projectName}</Link>
    }
};
/**
 * Renders information about projects assigned to the current user
 */
const ProjectContent = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/project/userId/${props.userid}`).then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    console.log(props.userid);
    console.log(data);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
        <div className="mx-auto w-75">
            <br />
            <br />
            <h2>Projects: <Link to="/newProject"><Button className='submit-new-project main'>Add Project</Button></Link></h2>
            <Table responsive striped bordered hover className="bg-light">
                <thead>
                    <tr>
                        <th>Project Id</th>
                        <th>Project Name</th>
                        <th>Contract Number</th>
                        <th>Contract Status</th>
                        <th>Org/Branch</th>
                        <th>Contract Value</th>
                        <th>Dependency Status</th>
                        <th>Financial Status</th>
                        <th>Schedule Status</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map(({project_id, project_name, contract_num, contract_status, branch, contract_value , dependency_status, financial_status, schedule_status }) => (
                        <tr key={project_id}>
                            <td>{project_id}</td>
                            <td> {renderContent(contract_status,project_id,project_name)}</td>
                            <td>{contract_num}</td>
                            <td>{contract_status}</td>
                            <td>{branch}</td>
                            <td>{contract_value}</td>
                            <td>{dependency_status}</td>
                            <td>{financial_status}</td>
                            <td>{schedule_status}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>        
    );
}

function Main() {

    const [userid, setUserid] = useState(0);

    const getUserId = (uid) => {
        setUserid(uid);
    }

    return (
        <div className="lightBlue">
            <NavB  getUserId={getUserId}/>
            <Container className="lightblue top-Padding">
                <Row>
                    {/*1*/}
                    <Col>
                        <DepSum />
                    </Col>
                    {/*2*/}
                    <Col>
                        <FinSum />
                    </Col>
                    {/*3*/}
                    <Col>
                        <SchedSum />
                    </Col>
               </Row>  
               <Row>
                    <ProjectContent userid={userid}/>
               </Row>
            </Container>
            <br />
        </div>
    );
}

export default Main;