import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';



export const ContractStatus = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/contract/contractaward/${props.data}`).then(response =>{
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if(isLoading){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
        <Card className="card no-bot-pad">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Contract Status</span>
                        </Col>
                        <Col style={{textAlign: 'right'}}>
                            <span><Button className='Button'>Edit</Button></span>
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            {/*TODO: Remake table when API can retreve data*/}
            <Table striped bordered hover className="bg-light">
                <thead>
                    <tr>
                        <th></th>
                        <th>Requirements Planning</th>
                        <th>Draft RFP Released</th>
                        <th>Approved at ABC</th>
                        <th>RFP Released</th>
                        <th>Proposal Received</th>
                        <th>Tech Eval Complete</th>
                        <th>Negotiations Complete</th>
                        <th>Awarded</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(({contract_status, requirement_plan, draft_rfp_released, approved_by_acb, rfp_released, proposal_received, tech_eval_comp, negotiation_comp, awarded})=> (
                            <tr>
                                <td>{contract_status}</td>
                                <td>{format(new Date(requirement_plan), 'yyyy/MM/dd')}</td>
                                <td>{format(new Date(draft_rfp_released), 'yyyy/MM/dd')}</td>
                                <td>{format(new Date(approved_by_acb), 'yyyy/MM/dd')}</td>
                                <td>{format(new Date(rfp_released), 'yyyy/MM/dd')}</td>
                                <td>{format(new Date(proposal_received), 'yyyy/MM/dd')}</td>
                                <td>{format(new Date(tech_eval_comp), 'yyyy/MM/dd')}</td>
                                <td>{format(new Date(negotiation_comp), 'yyyy/MM/dd')}</td>
                                <td>{format(new Date(awarded), 'yyyy/MM/dd')}</td>
                            </tr>
                        ))
                    }
                    {/* {
                        data.map(({})=>(
                            <tr>
                                <td>Actual</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                            </tr>
                        ))
                    } */}
                </tbody>
            </Table>
        </Card>
    );
}