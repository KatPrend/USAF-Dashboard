import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';

export const UpdateContractors = () => {

    const [addContractor, setAddContractor] = useState(false);
    const [removeContractor, setRemoveContractor] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [contractorToRemove, setContractorToRemove] = useState();
    const [contractorToAdd, setContractorToAdd] = useState("");
    const [summary, setSummary] = useState("");

    useEffect(() => {
        axios.get('/api/contractor/').then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    function chooseAdd() {
        setAddContractor(true);
        setRemoveContractor(false);
    }    

    function chooseRemove() {
        setRemoveContractor(true);
        setAddContractor(false);
    }

    let handleDropdownSelect = (e) => {
        setContractorToRemove(e);
        console.log(e);
    }

    let handleRemove = async () => {
        // TODO: delete from DB
        console.log(contractorToRemove);

        axios.delete('/api/contractor', {
            contractor_id: contractorToRemove
        })
        .then(function(res){
            setRemoveContractor(false);
        })
        .catch(function (err){
            console.log(err);
        });
    }

    let handleNewContractor = (e) => {
        setContractorToAdd(e.target.value);
    }

    let handleSummary = (e) => {
        setSummary(e.target.value);
    }

    let handleAdd = async (e) => {
        e.preventDefault();

        axios.post('/api/contractor', {
            contractor_name: contractorToAdd,
            summary: summary
        })
        .then(function(res){
            // res.data.insertId

            setAddContractor(false);

            axios.get('/api/contractor/').then(response => {
                setData(response.data);
                setLoading(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    return (
        <div>
            <h4>Update Contractors</h4>
            <Button className='submit-new-project' onClick={chooseAdd}>Add</Button>
            <Button className='submit-new-project' onClick={chooseRemove}>Remove</Button>
            {addContractor ? <>
                <Form>
                    <Form.Group>
                        <Form.Label>Contractor:</Form.Label>
                        <Form.Control type="contractor" placeholder='Contractor' onChange={handleNewContractor} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Summary</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter Summary" type="summary" onChange={handleSummary} />
                    </Form.Group>
                </Form>
                <Button className='submit-new-project' onClick={handleAdd}>Submit</Button>
            </> : null}
            {removeContractor ? 
            <>
                <DropdownButton className='dropdown' title="Contractors">
                    {data.map(({id, contractor_name, summary}) => (
                        <Dropdown.Item key={id} eventKey={id} onSelect={handleDropdownSelect}>
                            {contractor_name}
                        </Dropdown.Item>
                    ))
                    }
                </DropdownButton> 
                <Button className='submit-new-project' onClick={handleRemove}>Remove</Button>
            </> : null}
        </div>
    );
}