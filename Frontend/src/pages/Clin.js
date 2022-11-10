import React, { useState, useEffect } from 'react';
import './page.css';
import { Button, Table, Modal, ModalBody, ButtonGroup, ModalDialog, Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { NavB } from '../components/NavB';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';

var proj_id_global = -1;

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
    proj_id_global = id
    useEffect(() => {
        // id.project_id
        axios.get(`/api/clin/${id}`).then(response =>{
            setData(response.data);
            console.log(response.data)
            setLoading(false);
        });
    }, [props.showModal]);

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
                    <th>Edit Clin</th>
                </tr>
            </thead>
            <tbody>
                <tr>                  
                    <td><input placeholder="Filter by #" style={{width: '75%'}} type='text' name='textField' onChange={function (event) {set_clin_num_search(event.target.value)}} value={clin_num_search}></input></td>
                    <td><input placeholder="Filter by Type" style={{width: '75%'}} type='text' name='textField' onChange={function (event) {set_clin_type_search(event.target.value)}} value={clin_type_search}></input></td>
                    <td><input placeholder="Filter by Scope" style={{width: '75%'}} type='text' name='textField' onChange={function (event) {set_clin_scope_search(event.target.value)}} value={clin_scope_search}></input></td>
                    <td><input placeholder="Filter by Value" style={{width: '75%'}} type='text' name='textField' onChange={function (event) {projected_clin_value_search(event.target.value)}} value={projected_clin_value}></input></td>
                    <td><input placeholder="Filter by Estamate" style={{width: '75%'}} type='text' name='textField' onChange={function (event) {gov_est_search(event.target.value)}} value={gov_est_value}></input></td>
                    <td></td>
                </tr>

                {
                    data.map(({id, clin_num, project_id, clin_type, clin_scope, proj_clin_value, ind_gov_est}) => (
                        <tr key={clin_num} style={shouldDisplay(clin_num, clin_type, clin_scope, proj_clin_value, ind_gov_est) ? {} : {display: 'none'}}>
                            <td><Link to={{pathname: '/wbs', state: {clinNum:clin_num, projectID:project_id}}}>{clin_num}</Link></td>
                            <td>{clin_type}</td>
                            <td>{clin_scope}</td>
                            <td>${proj_clin_value}</td>
                            <td>${ind_gov_est}</td>
                            <td><Button onClick={() => {props.editClinFunc(id, clin_num, clin_type, clin_scope, ind_gov_est)}}>Edit</Button></td>
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
    const [showModal, setShowModal] = useState(false);
    const [addClinNum, setAddClinNum] = useState('');
    const [addClinType, setAddClinType] = useState(1);
    const [addClinScope, setAddClinScope] = useState('');
    const [addClinValue, setAddClinValue] = useState('');
    const [addClinEst, setAddClinEst] = useState('');
    const [fundingTypes, setFundingTypes] = useState('');
    const [target, setTarget] = useState(0);

    useEffect(() => {
        axios.get('/api/fundingType/').then(response => {
            setFundingTypes(response.data);
        });
    }, []);

    const  toggleModal = () => {showModal ? setShowModal(false) : setShowModal(true)}
    
    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    const addClin = async () => {
        console.log("Adding CLIN: " + addClinNum + " " + proj_id_global + " " + addClinType + " " + addClinScope + " " +  addClinEst )
            
        axios.post('/api/clin/', {
            clin_num: addClinNum,
            project_id: proj_id_global,
            clin_type: clinTypeToNum(addClinType),
            clin_scope: addClinScope,
            ind_gov_est: addClinEst
        })
        setAddClinNum('');
        setAddClinType(1);
        setAddClinScope('');
        setAddClinEst('');
    }

    const clinTypeToNum = (type) =>
    {
        if (type == "FFP")
            return 1;
        if (type == "FIFF")
            return 2;
        if (type == "FF-EPA")
            return 3;
        if (type == "CPFF")
            return 4;
        if (type == "CPIF")
            return 5;
        if (type == "CPAF")
            return 6;
        if (type == "T&M")
            return 7;
        // default to FFP
        return 1;
    }


    const editClin = async () => {
        console.log("Editing clin: " + addClinNum + " " + proj_id_global + " " + addClinType + " " + addClinScope + " " +  addClinEst )
        console.log(target)
            
        axios.put(`/api/clin/${target}`, {
            clin_num: addClinNum,
            project_id: proj_id_global,
            clin_type: addClinType,
            clin_scope: addClinScope,
            ind_gov_est: addClinEst
        })
        setAddClinNum('');
        setAddClinType(1);
        setAddClinScope('');
        setAddClinEst('');
    }

    const deleteClin = async () => {
        console.log("deleting clin: " + target)
            
        axios.delete(`/api/clin/${target}`, {})
        setAddClinNum('');
        setAddClinType(1);
        setAddClinScope('');
        setAddClinEst('');
    }


    const getEditClinData = (id, clin_num, clin_type, clin_scope, ind_gov_est) => {
        setTarget(id);
        setAddClinNum(clin_num);
        setAddClinType(clinTypeToNum(clin_type));
        setAddClinScope(clin_scope);
        setAddClinEst(ind_gov_est);
        toggleModal();
    }
    
    return (
        <>
            <Modal show={showModal} onHide={() => {
                    toggleModal();
                    setAddClinNum('');
                    setAddClinType(1);
                    setAddClinScope('');
                    setAddClinEst('');
                }}>
                <Modal.Header closeButton>
                    <Modal.Title>{ target === 0 ? 'Add CLIN' : 'Edit CLIN'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>CLIN Number</Form.Label>
                            <Form.Control onChange={function (event) {setAddClinNum(event.target.value)}} value={addClinNum} type="text" placeholder="Enter CLIN Number" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CLIN Type</Form.Label>
                            <Form.Control as="select" onChange={function (event) {setAddClinType(event.target.value)}} value={addClinType} type="text" placeholder="Enter CLIN Type">
                                <option value='1'>FFP</option>
                                <option value='2'>FFIF</option>
                                <option value='3'>FF-EPA</option>
                                <option value='4'>CPFF</option>
                                <option value='5'>CPIF</option>
                                <option value='6'>CPAF</option>
                                <option value='7'>T&M</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CLIN Scope</Form.Label>
                            <Form.Control onChange={function (event) {setAddClinScope(event.target.value)}} value={addClinScope} type="text" placeholder="Enter CLIN Scope" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Independent Goverment Cost Estamate</Form.Label>
                            <Form.Control onChange={function (event) {setAddClinEst(event.target.value)}} value={addClinEst} type="text" placeholder="Enter Independent Goverment Cost Estamate" />
                        </Form.Group>
                        {target === 0 ? <></> : 
                            <Button onClick={() => {deleteClin(); toggleModal(); setTarget(0);}} variant="danger">
                                Delete CLIN
                            </Button>                    
                        }
                        <Button onClick={() => {(target === 0 ? addClin() : editClin()); toggleModal(); setTarget(0);}} variant="primary">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {toggleModal(); setTarget(0);}}>Close</Button>
                </Modal.Footer>
            </Modal>
            <div className="lightBlue">
                <NavB getUserInfo={getUserInfo}/>
                <div className="d-flex justify-content-between p-2">
                    <h2>Projects:</h2>
                    <Button onClick={() => {toggleModal(); setTarget(0);}}>Add</Button>
                </div>
                <ClinData editClinFunc={getEditClinData} showModal={showModal}/>
            </div>
        </>
    );
}

export default Clin