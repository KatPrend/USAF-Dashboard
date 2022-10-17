import React, { useState, useEffect } from 'react';
import axios from "axios";
import './page.css';
import {Link} from 'react-router-dom';
import { Col, Container, Button, Row, Table } from 'react-bootstrap';
import { useMsal } from "@azure/msal-react";
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
const ProjectContent = () => {
    const {accounts} = useMsal();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/project/userEmail/${accounts[0].username}`).then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
        <div className="mx-auto w-75">
            <h2>Projects: <Link to="/newProject"><Button>Add Project</Button></Link></h2>
            <Table striped bordered hover className="bg-light">
                <thead>
                    <tr>
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
                    data.map(({ project_id, project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num }) => (
                        <tr key={project_id}>
                            <td> {renderContent(contract_status,project_id,project_name)}</td>
                            <td>{contract_num}</td>
                            <td>{contract_status}</td>
                            <td>{branch}</td>
                            <td>Pending Contract Value</td>
                            <td>Pending Dependency Status</td>
                            <td>Pending Financial Status</td>
                            <td>Pending Schedule Status</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>        
    );
}

function Main() {

    return (
        <div className="lightBlue">
            <NavB />
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
                    <ProjectContent/>
               </Row>
            </Container>
            <br />
        </div>
    );
}

export default Main;