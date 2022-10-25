import React, { useState, useEffect } from 'react';
import './page.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { NavB } from '../components/NavB';
import { useLocation } from 'react-router-dom';
import {Link, useHistory} from 'react-router-dom';

const ClinData = (props) => {

    // const history = useHistory();

    // const routeChange = () => {
    //     history.push('/wbs');
    // };

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    const location = useLocation();
    const {id} = location.state;

    useEffect(() => {
        // id.project_id
        axios.get(`/api/clin/${id}`).then(response =>{
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
                    <th>CLIN Number</th>
                    <th>CLIN Type</th>
                    <th>CLIN Scope</th>
                    <th>Projected CLIN Value</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(({id, clin_num, project_id, clin_type, clin_scope, proj_clin_value}) => (
                        <tr key={id}>
                            <td><Link to={{pathname: '/wbs', state: {clinNum:clin_num, projectID:project_id}}}>{clin_num}</Link></td>
                            <td>{clin_type}</td>
                            <td>{clin_scope}</td>
                            <td>{proj_clin_value}</td>
                        </tr>
                    ))
                }
            </tbody>    
        </Table>
    );
}

function Clin() {
    return (
        <div className="lightBlue">
            <NavB />
            <div className="d-flex justify-content-between p-2">
                <h2>Projects:</h2>
                <Button>Edit</Button>
                <Button>Back</Button>
            </div>
            <ClinData/>
        </div>
    );
}

export default Clin;