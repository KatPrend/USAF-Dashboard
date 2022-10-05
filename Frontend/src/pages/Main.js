import React, { useState, useEffect } from 'react';
import './page.css';
import { Card, Col, Container, Button, Row, Table } from 'react-bootstrap';
import { ProfileData } from "../components/ProfileData";
import { callMsGraph } from "../graph";
import { loginRequest } from "../authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
 const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    return (
        <div>
            <h5 className="card-title">Welcome {accounts[0].name} and {accounts[0].username}</h5>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
            }
        </div>
    );
};



function Main() {

    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
    }).then((response) => {
        callMsGraph(response.accessToken).then(response => setGraphData(response));
    });

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/getprojectbyuser/${accounts[0].username}`)

        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
            }
            return response.json();
        })

        .then((actualData) => {
            setData(actualData);
            setError(null);
        })

        .catch((err) => {
            setError(err.message);
            setData(null);
        })

        .finally(() => {
                setLoading(false);
        });
    }, []);

    return (
        <body className="lightBlue">
            <Container className="lightblue top-Padding">
                <Row>
                    {/*1*/}
                    <Col>
                        <ProfileContent />
                        <Card class='card'>
                            <Card.Header class="text-center cardHead">Dependency Summary</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!{accounts[0].username}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*2*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Financial Summary</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*3*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Schedule Summary</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
               </Row>
               <Row>
                    {/*1*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Future Expansion</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*2*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Future Expansion</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/*3*/}
                    <Col>
                        <Card className='card'>
                            <Card.Header className="text-center cardHead">Future Expansion</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Placeholder text lives here!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
               </Row>
            </Container>
            <div className="mx-auto w-75">
                <h2>Projects: <Button>Add Project</Button></h2>
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
                        // data.map((item) => (
                        //     <tr key={item.project_id}>
                        //         <td>{item.contract_num}</td>
                        //         <td>{item.contract_status}</td>
                        //         <td>{item.branch}</td>
                        //         <td>Pending Contract Value</td>
                        //         <td>Pending Dependency Status</td>
                        //         <td>Pending Financial Status</td>
                        //         <td>Pending Schedule Status</td>
                        //     </tr>
                        // ))
                    }
                    
                    </tbody>
                </Table>
            </div>
        </body>
    );   
}

export default Main;