import React, { useState, useEffect } from 'react';
import './page.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { NavB } from '../components/NavB';
import { useLocation} from 'react-router-dom';

const WbsData = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    const location = useLocation();
    const {projectID, clinNum} = location.state;
    const [task_id_search, set_task_id_search] = useState('');
    const [task_description_search, set_task_description_search] = useState('');
    const [month_search, set_month_search] = useState('');
    const [clin_search, set_clin_search] = useState('');
    const [source_type_search, set_source_type_search] = useState('');
    const [resource_search, set_resource_search] = useState('');
    const [resource_description_search, set_resource_description_search] = useState('');
    const [resource_type_search, set_resource_type_search] = useState('');
    const [rate_search, set_rate_search] = useState('');
    const [hours_search, set_hours_search] = useState('');
    const [units_search, set_units_search] = useState('');
    const [cost_search, set_cost_search] = useState('');
    const [base_cost_search, set_base_cost_search] = useState('');
    const [direct_cost_search, set_direct_cost_search] = useState('');
    const [total_price_search, set_total_price_search] = useState('');

    useEffect(() => {
        axios.get(`/api/wbs/project/${projectID}/clin/${clinNum}`).then(response =>{
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if(isLoading){
        return <div className="mx-auto w-75">Loading...</div>;
    }

    // search stuff
    // protects from toStrining null or undefined
    const safeToString = (input) => {
        if (input === null)
            return 'null';
        if (input === undefined)
            return 'undefined';
        return input.toString();
    }

    // check if should display
    const shouldDisplay = (task_id, task_description, month, clin_num, source_type, resource_code, resource_type, resource_description, rate, hours_worked, units, cost, base_cost, direct_cost, total_price) => {
        // if x does not contain the xSearch and xSearch is not empty
        if (!(safeToString(task_id).toLowerCase().includes(task_id_search.toLowerCase())) && task_id_search !== '')
            return false;
        if (!(safeToString(task_description).toLowerCase().includes(task_description_search.toLowerCase())) && task_description_search !== '')
            return false;
        if (!(safeToString(month).toLowerCase().includes(month_search.toLowerCase())) && month_search !== '')
            return false;
        if (!(safeToString(clin_num).toLowerCase().includes(clin_search.toLowerCase())) && clin_search !== '')
            return false;
        if (!(safeToString(source_type).toLowerCase().includes(source_type_search.toLowerCase())) && source_type_search !== '')
            return false;
        if (!(safeToString(resource_code).toLowerCase().includes(resource_search.toLowerCase())) && resource_search !== '')
            return false;
        if (!(safeToString(resource_type).toLowerCase().includes(resource_type_search.toLowerCase())) && resource_type_search !== '')
            return false;
        if (!(safeToString(resource_description).toLowerCase().includes(resource_description_search.toLowerCase())) && resource_description_search !== '')
            return false;
        if (!(safeToString(rate).toLowerCase().includes(rate_search.toLowerCase())) && rate_search !== '')
            return false;
        if (!(safeToString(hours_worked).toLowerCase().includes(hours_search.toLowerCase())) && hours_search !== '')
            return false;
        if (!(safeToString(units).toLowerCase().includes(units_search.toLowerCase())) && units_search !== '')
            return false;
        if (!(safeToString(cost).toLowerCase().includes(cost_search.toLowerCase())) && cost_search !== '')
            return false;
        if (!(safeToString(base_cost).toLowerCase().includes(base_cost_search.toLowerCase())) && base_cost_search !== '')
            return false;
        if (!(safeToString(direct_cost).toLowerCase().includes(direct_cost_search.toLowerCase())) && direct_cost_search !== '')
            return false;
        if (!(safeToString(total_price).toLowerCase().includes(total_price_search.toLowerCase())) && total_price_search !== '')
            return false;
        return true;
    }
    const searchStyle = {width: '100%'};

    return(
        <Table responsive striped bordered hover className="bg-light">
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
                <tr>                  
                    <td><input placeholder="Filter by Id" style={searchStyle} type='text' name='textField' onChange={function (event) {set_task_id_search(event.target.value)}} value={task_id_search}></input></td>
                    <td><input placeholder="Filter by Description" style={searchStyle} type='text' name='textField' onChange={function (event) {set_task_description_search(event.target.value)}} value={task_description_search}></input></td>
                    <td><input placeholder="Filter by Month" style={searchStyle} type='text' name='textField' onChange={function (event) {set_month_search(event.target.value)}} value={month_search}></input></td>
                    <td><input placeholder="Filter by CLIN" style={searchStyle} type='text' name='textField' onChange={function (event) {set_clin_search(event.target.value)}} value={clin_search}></input></td>
                    <td><input placeholder="Filter by Type" style={searchStyle} type='text' name='textField' onChange={function (event) {set_source_type_search(event.target.value)}} value={source_type_search}></input></td>
                    <td><input placeholder="Filter by Code" style={searchStyle} type='text' name='textField' onChange={function (event) {set_resource_search(event.target.value)}} value={resource_search}></input></td>
                    <td><input placeholder="Filter by description" style={searchStyle} type='text' name='textField' onChange={function (event) {set_resource_description_search(event.target.value)}} value={resource_description_search}></input></td>
                    <td><input placeholder="Filter by Type" style={searchStyle} type='text' name='textField' onChange={function (event) {set_resource_type_search(event.target.value)}} value={resource_type_search}></input></td>
                    <td><input placeholder="Filter by Rate" style={searchStyle} type='text' name='textField' onChange={function (event) {set_rate_search(event.target.value)}} value={rate_search}></input></td>
                    <td><input placeholder="Filter by Hours" style={searchStyle} type='text' name='textField' onChange={function (event) {set_hours_search(event.target.value)}} value={hours_search}></input></td>
                    <td><input placeholder="Filter by Units" style={searchStyle} type='text' name='textField' onChange={function (event) {set_units_search(event.target.value)}} value={units_search}></input></td>
                    <td><input placeholder="Filter by Cost" style={searchStyle} type='text' name='textField' onChange={function (event) {set_cost_search(event.target.value)}} value={cost_search}></input></td>
                    <td><input placeholder="Filter by Base cost" style={searchStyle} type='text' name='textField' onChange={function (event) {set_base_cost_search(event.target.value)}} value={base_cost_search}></input></td>
                    <td><input placeholder="Filter by Direct cost" style={searchStyle} type='text' name='textField' onChange={function (event) {set_direct_cost_search(event.target.value)}} value={direct_cost_search}></input></td>
                    <td><input placeholder="Filter by Total price" style={searchStyle} type='text' name='textField' onChange={function (event) {set_total_price_search(event.target.value)}} value={total_price_search}></input></td>
                </tr>
                {
                    data.map(({id, task_id, task_description, month, wbs, clin_num, source_type, resource_code, resource_type, resource_description, rate, hours_worked, units, cost, base_cost, direct_cost, total_price}) => (
                        <tr key={id} style={shouldDisplay(task_id, task_description, month, clin_num, source_type, resource_code, resource_type, resource_description, rate, hours_worked, units, cost, base_cost, direct_cost, total_price) ? {} : {display: 'none'}}>
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

    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    return (
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo} />
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