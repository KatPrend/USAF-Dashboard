import React, { useState, useEffect } from 'react';
import './page.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { NavB } from '../components/NavB';
import { useLocation } from 'react-router-dom';

const WbsData = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    const location = useLocation();
    const {projectID, clinNum} = location.state;

    // TODO: update request w/ backend
    useEffect(() => {
        axios.get(`/api/wbs/project/${projectID}/clin/${clinNum}`).then(response =>{
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if(isLoading){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return(
        <Table striped bordered hover className="bg-light">
            <thead>
                <tr>
                    <th>Task ID</th>
                    <th>Task Description</th>
                    <th>Month</th>
                    <th>CLIN</th>
                    <th>Source Type</th>
                    <th>Resource</th>
                    <th>Resource Description</th>
                    <th>Resource Type</th>
                    <th>Rate</th>
                    <th>Hours</th>
                    <th>Units</th>
                    <th>Cost</th>
                    <th>Base Cost</th>
                    <th>Direct Cost</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(({id, task_id, task_description, month, wbs, clin_num, source_type, resource_code, resource_type, resource_description, rate, hours_worked, units, cost, base_cost, direct_cost, total_price}) => (
                        <tr key={id}>
                            <td>{task_id}</td>
                            <td>{task_description}</td>
                            <td>{month}</td>
                            <td>{clin_num}</td>
                            <td>{source_type}</td>
                            <td>{resource_code}</td>
                            <td>{resource_description}</td>
                            <td>{resource_type}</td>
                            <td>{rate}</td>
                            <td>{hours_worked}</td>
                            <td>{units}</td>
                            <td>{cost}</td>
                            <td>{base_cost}</td>
                            <td>{direct_cost}</td>
                            <td>{total_price}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

function WBS() {
    return (
        <div className="lightBlue">
            <NavB />
            <div className="d-flex justify-content-between p-2">
                <h2>Projects:</h2>
                <Button>Edit</Button>
                <Button>Back</Button>
            </div>
            <WbsData/>
        </div>
    );
}

export default WBS;