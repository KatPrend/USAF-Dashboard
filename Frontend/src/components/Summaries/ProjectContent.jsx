import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import { Button, Table, Form, Row } from 'react-bootstrap';
import {SummaryIcon} from './SummaryIcon';

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
    else if (contractStatus === "Closed"){
        return <Link to={{ 
            pathname: "/completedproject", 
            state: {id:projectId} // your data array of objects
        }}
      >{projectName}</Link>
    }
};


/**
 * Renders information about projects assigned to the current user
 */
export const ProjectContent = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    // search
    //useState Hooks
    const [project_id_search, set_project_id_search] = useState('');
    const [project_name_search, set_project_name_search] = useState('');
    const [contract_num_search, set_contract_num_search] = useState('');
    const [contract_status_search, set_contract_status_search] = useState('');
    const [branch_search, set_branch_search] = useState('');
    const [contract_value_search, set_contract_value_search] = useState('');
    const [dependency_status_search, set_dependency_status_search] = useState('');
    const [financial_status_search, set_financial_status_search] = useState('');
    const [schedule_status_search, set_schedule_status_search] = useState('');



    useEffect(() => {

        if (props.userRole === "Admin") {
            axios.get(`/api/project/`).then(response => {
                setData(response.data);
                setLoading(false);
            });
        } else {
            axios.get(`/api/project/userId/${props.userid}`).then(response => {
                setData(response.data);
                setLoading(false);
            });
        }
    }, []);

    // console.log(props.userid);
    // console.log(data);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    // protects from toString null or undefined
    const safeToString = (input) => {
        if (input === null)
            return 'null';
        if (input === undefined)
            return 'undefined';
        return input.toString();
    }

    // check if should display
    const shouldDisplay = (project_id, project_name, contract_num, contract_status, branch, contract_value , dependency_status, financial_status, schedule_status) => {
        // if x does not contain the xSearch and xSearch is not empty
        if (!(safeToString(project_id).toLowerCase().includes(project_id_search.toLowerCase())) && project_id_search !== '')
            return false;
        if (!(safeToString(project_name).toLowerCase().includes(project_name_search.toLowerCase())) && project_name_search !== '')
            return false;
        if (!(safeToString(contract_num).toLowerCase().includes(contract_num_search.toLowerCase())) && contract_num_search !== '')
            return false;
        if (!(safeToString(contract_status).toLowerCase().includes(contract_status_search.toLowerCase())) && contract_status_search !== '')
            return false;
        if (!(safeToString(branch).toLowerCase().includes(branch_search.toLowerCase())) && branch_search !== '')
            return false;
        if (!(safeToString(contract_value).toLowerCase().includes(contract_value_search.toLowerCase())) && contract_value_search !== '')
            return false;
        if (!(safeToString(dependency_status).toLowerCase() === (dependency_status_search.toLowerCase())) && dependency_status_search !== '')
            return false;
        if (!(safeToString(financial_status).toLowerCase() === (financial_status_search.toLowerCase())) && financial_status_search !== '')
            return false;
        if (!(safeToString(schedule_status).toLowerCase() === (schedule_status_search.toLowerCase())) && schedule_status_search !== '')
            return false;
        return true;
    }

    const searchStyle = {width: '100%'};
    return (
        <div className="mx-auto" style={{margin: '5%', height: 'auto', width: '90%'}}>
            <Row style={{display:"flex", justifyContent:"space-between"}}>
                <h2 style={{width: '10%'}}>
                    Projects: 
                </h2>
                {props.userRole === "Contractor" ? null : <Link style={{width: '15%'}} to="/newProject"><Button className='submit-new-project main'><span style={{whiteSpace: 'nowrap'}}>Add Project</span></Button></Link>}
            </Row>

            <Table responsive striped bordered hover className="bg-light w-100 mx-auto">
                <thead>
                    <tr>
                        <th>Project Id</th>
                        <th>Project Name</th>
                        <th>Contract Number</th>
                        <th>Contract Status</th>
                        <th>Org/Branch</th>
                        {props.userRole === "Contractor" ? null : <th>Contract Value ($)</th>}
                        <th>Dependency Status</th>
                        {props.userRole === "Contractor" ? null : <th>Financial Status</th>}
                        <th>Schedule Status</th>
                    </tr>
                </thead>    
                <tbody>
                <tr>                  
                    <td><input placeholder="Filter by Id" style={{width: '50%'}} type='text' name='textField' onChange={function (event) {set_project_id_search(event.target.value)}} value={project_id_search}></input></td>
                    <td><input placeholder="Filter by Name" style={searchStyle} type='text' name='textField' onChange={function (event) {set_project_name_search(event.target.value)}} value={project_name_search}></input></td>
                    <td><input placeholder="Filter by Contract #" style={searchStyle} type='text' name='textField' onChange={function (event) {set_contract_num_search(event.target.value)}} value={contract_num_search}></input></td>
                    <td><input placeholder="Filter by status" style={searchStyle} type='text' name='textField' onChange={function (event) {set_contract_status_search(event.target.value)}} value={contract_status_search}></input></td>
                    <td><input placeholder="Filter by branch" style={searchStyle} type='text' name='textField' onChange={function (event) {set_branch_search(event.target.value)}} value={branch_search}></input></td>
                    {props.userRole === "Contractor" ? null : <td><input placeholder="Filter by value" style={searchStyle} type='text' name='textField' onChange={function (event) {set_contract_value_search(event.target.value)}} value={contract_value_search}></input></td>}
                    <td>
                        <Form.Control as='select' style={searchStyle} onChange={function (event) {set_dependency_status_search(event.target.value)}}>
                            <option value="">No Filter</option>
                            <option value="ONTRACK">On-Track</option>
                            <option value="BEHIND">Behind</option>
                            <option value="REALLY-BEHIND">Really-Behind</option>
                        </Form.Control>
                    </td>
                    {props.userRole === "Contractor" ? null :   <td>
                                                                    <Form.Control as='select' style={searchStyle} onChange={function (event) {set_financial_status_search(event.target.value)}}>
                                                                        <option value="">No Filter</option>
                                                                        <option value="ON-BUDGET">On-Budget</option>
                                                                        <option value="UNDER">Under-Budget</option>
                                                                        <option value="OVER">Over-Budget</option>
                                                                    </Form.Control>
                                                                </td>}
                    <td>
                        <Form.Control as='select' style={searchStyle} onChange={function (event) {set_schedule_status_search(event.target.value)}}>
                            <option value="">No Filter</option>
                            <option value="ONTRACK">On-Track</option>
                            <option value="BEHIND">Behind</option>
                            <option value="REALLY-BEHIND">Really-Behind</option>
                        </Form.Control>
                    </td>
                </tr>
                {
                    data.map(({ id, project_name, contract_num, contract_status, branch, contract_value , dependency_status, financial_status, schedule_status }) => (
                        <tr key={id} style={shouldDisplay(id, project_name, contract_num, contract_status, branch, contract_value , dependency_status, financial_status, schedule_status) ? {} : {display: 'none'}}>
                            <td>{id}</td>
                            <td> {renderContent(contract_status,id,project_name)}</td>
                            <td>{contract_num}</td>
                            <td>{contract_status}</td>
                            <td>{branch}</td>
                            {props.userRole === "Contractor" ? null : <td>${contract_value}</td>}
                            <td><SummaryIcon data = {dependency_status} /></td>
                            {props.userRole === "Contractor" ? null : <td><SummaryIcon data = {financial_status} /></td>}
                            <td><SummaryIcon data = {schedule_status} /></td>

                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>        
    );
}