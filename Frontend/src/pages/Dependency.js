import React, { useState, useEffect } from 'react';
import axios from "axios";
import './page.css';
import { Col, Container, Button, Row, Table } from 'react-bootstrap';
import { CardGeneric } from '../components/CardGeneric'
import { useMsal } from "@azure/msal-react";
/**
 * Renders information about projects assigned to the current user
 */
const ProjectContent = () => {
    const {accounts} = useMsal();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/getprojectbyuser/${accounts[0].username}`).then(response => {
            setData(response.data);
            setLoading(false);
        });

    }, []);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
        <div className="mx-auto w-75">
            <Table striped bordered hover className="bg-light">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Dependent Milestone</th>
                        <th>Date</th>
                        <th>Leading Project</th>
                        <th>Leading Milestone</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Impact</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map(({ project_id, project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num }) => (
                        <tr key={project_id}>
                            <td><a href='/clin'>{project_name}</a></td>
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

function Dependency() {

    return (
        <div className="lightBlue">
            <Container className="lightblue top-Padding">
                <Row>
                    {/*1*/}
                    <Col>
                        <CardGeneric Header='Dependency Summary' Body='Placeholder text lives here!'></CardGeneric>
                    </Col>
                    {/*2*/}
                    <Col>
                        <CardGeneric Header='Dependency Grapuh' Body='TODO: <put graph here>'></CardGeneric>
                    </Col>

               </Row>

            </Container>
               
            <ProjectContent/>

        </div>
    );
}

export default Dependency;