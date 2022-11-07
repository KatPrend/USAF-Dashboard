import React, { useState, useEffect } from 'react';
import './page.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { NavB } from '../components/NavB';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';

const ClinData = (props) => {

    // const history = useHistory();

    // const routeChange = () => {
    //     history.push('/wbs');
    // };

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [clin_num_search, set_clin_num_search] = useState('');
    const [clin_type_search, set_clin_type_search] = useState('');
    const [clin_scope_search, set_clin_scope_search] = useState('');
    const [projected_clin_value, projected_clin_value_search] = useState('');
    const [gov_est_value, gov_est_search] = useState('');

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

    // search
    // protects from toStrining null or undefined
    const safeToString = (input) => {
        if (input === null)
            return 'null';
        if (input === undefined)
            return 'undefined';
        return input.toString();
    }
    // check if should display
    const shouldDisplay = (clin_num, project_id, clin_type, proj_clin_value, gov_est) => {
        // if x does not contain the xSearch and xSearch is not empty
        if (!(safeToString(clin_num).toLowerCase().includes(clin_num_search.toLowerCase())) && clin_num_search !== '')
            return false;
        if (!(safeToString(project_id).toLowerCase().includes(clin_type_search.toLowerCase())) && clin_type_search !== '')
            return false;
        if (!(safeToString(clin_type).toLowerCase().includes(clin_scope_search.toLowerCase())) && clin_scope_search !== '')
            return false;
        if (!(safeToString(proj_clin_value).toLowerCase().includes(projected_clin_value.toLowerCase())) && projected_clin_value !== '')
            return false;
        if (!(safeToString(gov_est).toLowerCase().includes(gov_est_value.toLowerCase())) && gov_est_value !== '')
            return false;
        return true;
    }
    
    return(
        <Table striped bordered hover className="bg-light">
            <thead>
                <tr>
                    <th>CLIN Number</th>
                    <th>CLIN Type</th>
                    <th>CLIN Scope</th>
                    <th>Projected CLIN Value</th>
                    <th>Independent Goverment Cost Estamate</th>
                </tr>
            </thead>
            <tbody>
                <tr>                  
                    <td><input placeholder="Filter by #" style={{width: '75%'}} type='text' name='textField' onChange={function (event) {set_clin_num_search(event.target.value)}} value={clin_num_search}></input></td>
                    <td><input placeholder="Filter by Type" style={{width: '75%'}} type='text' name='textField' onChange={function (event) {set_clin_type_search(event.target.value)}} value={clin_type_search}></input></td>
                    <td><input placeholder="Filter by Scope" style={{width: '75%'}} type='text' name='textField' onChange={function (event) {set_clin_scope_search(event.target.value)}} value={clin_scope_search}></input></td>
                    <td><input placeholder="Filter by Value" style={{width: '75%'}} type='text' name='textField' onChange={function (event) {projected_clin_value_search(event.target.value)}} value={projected_clin_value}></input></td>
                    <td><input placeholder="Filter by Estamate" style={{width: '75%'}} type='text' name='textField' onChange={function (event) {gov_est_search(event.target.value)}} value={gov_est_value}></input></td>
                </tr>

                {
                    data.map(({id, clin_num, project_id, clin_type, clin_scope, proj_clin_value, ind_gov_est}) => (
                        <tr key={id} style={shouldDisplay(clin_num, clin_type, clin_scope, proj_clin_value, ind_gov_est) ? {} : {display: 'none'}}>
                            <td><Link to={{pathname: '/wbs', state: {clinNum:clin_num, projectID:project_id}}}>{clin_num}</Link></td>
                            <td>{clin_type}</td>
                            <td>{clin_scope}</td>
                            <td>${proj_clin_value}</td>
                            <td>${ind_gov_est}</td>
                        </tr>
                    ))
                }
            </tbody>    
        </Table>
    );
}

function Clin() {

    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    return (
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo}/>
            <div className="d-flex justify-content-between p-2">
                <h2>Projects:</h2>
                <Button>Add</Button>
            </div>
            <ClinData/>
        </div>
    );
}

export default Clin