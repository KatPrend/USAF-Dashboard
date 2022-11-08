import React, { useState, useEffect } from "react";
import { Table, Form, Button, Alert, DropdownButton, Row, Col, Container } from 'react-bootstrap';
import axios from "axios";
import DropdownItem from "react-bootstrap/esm/DropdownItem";



export function ApprovedFundingTable({data}){
    const [allFundingTypes, setAllFundingTypes] = useState();
    const [isLoading, setLoading] = useState(true);
    let fiscalYears = [];
    let fundingTypes = [];

    
    useEffect(() => {
        axios.get('/api/fundingType/').then(response => {
            setAllFundingTypes(response.data);
            setLoading(false);
        });
    }, []);

    
    function getRowsAndCol(data){
        data.map((currObject) => {
            if(fundingTypes.includes(currObject.appro_funding_type) === false){
                fundingTypes.push(currObject.appro_funding_type);
            }
            if(fiscalYears.includes(currObject.appro_fiscal_year) === false){
                fiscalYears.push(currObject.appro_fiscal_year);
            }
        })
    }

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    return(
        <div>
            <Table responsive striped bordered hover className="bg-light">
                {getRowsAndCol(data)}
                <tbody>
                    <tr>
                        <td key = "1" >Funding Type</td>
                        {fiscalYears.map( (year) => (
                            <td key = {year}>FY'{year}</td>
                        ))}
                    </tr>
                    {fundingTypes.map((funding) => (
                        <tr>
                            {allFundingTypes.map(({id, funding_type}) => (
                                id === funding ? <td>{funding_type}</td> : null
                            ))}
                            {fiscalYears.map( (year) => (
                                <>
                                {data.map( (info) => (
                                    <>
                                    {info.appro_fiscal_year === year && info.appro_funding_type === funding
                                    ?
                                    <td>{info.approved_amount}</td>
                                    :
                                    null
                                    }
                                    </>
                                ))}
                                </>
                            ))}
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
        </div>
    )
}




export function ApprovedFundingTableEditable(props){
    const [editData, setEditData] = useState(props.data);
    const [elementsEdited, setElementsEdited] = useState([]);
    const [allFundingTypes, setAllFundingTypes] = useState();
    const [isLoading, setLoading] = useState(true);
    const [fundingTypeToAdd, setFundingTypeToAdd] = useState();
    const [fiscalYearToAdd, setFiscalYearToAdd] = useState();
    const [addedColSelected, setAddedCol] = useState(false);
    const [addedRowSelected, setAddedRow] = useState(false);
    

    const [showColAlert, setShowColAlert] = useState(false);
    const [showRowAlert, setShowRowAlert] = useState(false);
    const [columnToDelete, setColumnToDelete] = useState();
    const [rowToDelete, setRowToDelete] = useState();

    let fiscalYears = [];
    let fundingTypes = [];

    useEffect(() => {
        axios.get('/api/fundingType/').then(response => {
            setAllFundingTypes(response.data);
            setLoading(false);
        });
    }, []);

    function getRowsAndCol(data){
        data.map((currObject) => {
            if(fundingTypes.includes(currObject.appro_funding_type) === false){
                fundingTypes.push(currObject.appro_funding_type);
            }
            if(fiscalYears.includes(currObject.appro_fiscal_year) === false){
                fiscalYears.push(currObject.appro_fiscal_year);
            }
        })
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        editData.map((currElement) => (
            
            (elementsEdited.includes(currElement.id) === true 
            ?
                axios.put('/api/approved', {
                    approvedID: currElement.id,
                    projectID: currElement.project_id,
                    appro_funding_type: currElement.appro_funding_type,
                    appro_fiscal_year: currElement.appro_fiscal_year,
                    approved_amount: parseInt(currElement.approved_amount)
                })
                

             : null)
        ))
        
        setElementsEdited([]);
    }


    const handleFundingType = (e, id) => {
        if(elementsEdited.includes(id) === false){
            setElementsEdited([...elementsEdited, id])
        }
        
        var temp;

        editData.map((currObject) => (
            currObject.id === id ? temp = currObject : null
        ))

        temp.approved_amount = e.target.value;
        
        setEditData(editData.map((currObject) =>(
            currObject.id === id ? {...temp} : {...currObject}
        )))
        
    }

    let handleFundingTypeSelect = (e) => {
        setFundingTypeToAdd(e);
        setAddedRow(true);
    }

    let handleFisscalYearSelect = (e) => {
        setFiscalYearToAdd(e.target.value);
        setAddedCol(true);
    }

    const handleFirstApproved = async (e) => {
        e.preventDefault();

        if(addedColSelected === true && addedRowSelected){
            axios.post('/api/approved', {
                project_id: props.id, 
                appro_funding_type: fundingTypeToAdd, 
                appro_fiscal_year: fiscalYearToAdd, 
                approved_amount: 0
            })
            
            setAddedCol(false);
        }
    }

    const handleAddCol = async (e) => {
        e.preventDefault();

        if(addedColSelected === true && fiscalYears.includes(parseInt(fiscalYearToAdd)) === false){
            fundingTypes.map((funding) => (
                axios.post('/api/approved', {
                    project_id: props.id, 
                    appro_funding_type: funding, 
                    appro_fiscal_year: fiscalYearToAdd, 
                    approved_amount: 0
                })
            ))

            setAddedCol(false);
        }
    }

    const handleColAlert = (col) => {
        setColumnToDelete(col);
        setShowColAlert(true);
    }

    const DeleteCol = async (e) => {
        e.preventDefault();

        editData.map((currElement) => {
            if(currElement.appro_fiscal_year === columnToDelete){
                axios.delete(`/api/approved/${currElement.id}`, )
            }
        })

        setShowColAlert(false);
    }

    const handleAddRow = async (e) => {
        e.preventDefault();

        if(addedRowSelected === true){
            fiscalYears.map((year) =>(
                axios.post('/api/approved', {
                    project_id: props.id, 
                    appro_funding_type: fundingTypeToAdd, 
                    appro_fiscal_year: year, 
                    approved_amount: 0
                })
            ))
            setAddedRow(false);
        }
    }

    const handleRowAlert = (row) => {
        setRowToDelete(row);
        setShowRowAlert(true);
    }

    const DeleteRow = async (e) => {
        e.preventDefault();
        
        editData.map((currElement) => {
            if(currElement.appro_funding_type === rowToDelete){
                axios.delete(`/api/approved/${currElement.id}`, )
            }
        })
        setShowRowAlert(false);
    }

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    if(isLoading === false && editData.length === 0){
        return(
            <Container>
                <Row>
                    <Col>Enter Fiscal Year and Funding Type</Col>
                </Row>
                <Row>
                    <Col>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>FY'</Form.Label>
                            <Col sm={2}>
                                <Form.Control onChange={handleFisscalYearSelect} />
                            </Col>
                        </Form.Group>
                    </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={{alignSelf: 'left'}}>
                    <DropdownButton className="Button" title="Funding Types">
                        {allFundingTypes.map(({id, funding_type}) => (
                            (fundingTypes.includes(id) === true ? null :
                                <DropdownItem key={id} eventKey={id} onSelect={handleFundingTypeSelect}>
                                    {funding_type}
                                </DropdownItem>
                            )
                        ))}
                    </DropdownButton>
                    </Col>
                </Row>
                <Row>
                    <Col><Button onClick={handleFirstApproved}>Submit</Button></Col>
                </Row>

            </Container>
        );
    }

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Table responsive striped bordered hover className="bg-light">
                    {getRowsAndCol(editData)}
                    <tbody>
                        <tr>
                            <td> </td>
                            <td> </td>
                            {fiscalYears.map( (year, index) => (
                                <td><Button className="Button" onClick={() => handleColAlert(year)}>Delete Column {index+1}</Button></td>
                            ))}
                            <td><Button className="Button" onClick={handleAddCol}>Add Column</Button></td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td key = "1" >Funding Type</td>
                            {fiscalYears.map( (year) => (
                                <td key = {year}>FY'{year}</td>
                            ))}
                            <td>FY'
                                <Form>
                                    <Form.Group>
                                        <Form.Control type="text" onChange={handleFisscalYearSelect}/>
                                    </Form.Group>
                                </Form>
                            </td>
                        </tr>
                        {fundingTypes.map((funding, index) => (
                            <tr>
                                <td><Button className="Button" onClick={() => handleRowAlert(funding)}>Delete Row {index+1}</Button></td>
                                {allFundingTypes.map(({id, funding_type}) => (
                                    id === funding ? <td>{funding_type}</td> : null
                                ))}
                                {fiscalYears.map( (year) => (
                                    <>
                                    {editData.map( (info) => (
                                        <>
                                        {info.appro_fiscal_year === year && info.appro_funding_type === funding
                                        ?
                                        <td>
                                            <Form.Group key={index}>
                                                <Form.Control 
                                                defaultValue={info.approved_amount} 
                                                onChange={(e) => handleFundingType(e, info.id)}/>
                                            </Form.Group>
                                        </td>
                                        :
                                        null
                                        }
                                        </>
                                    ))}
                                    </>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td><Button className="Button" onClick={handleAddRow}>Add Row</Button></td>
                            <td><DropdownButton className="Button" title="Funding Types">
                                    {allFundingTypes.map(({id, funding_type}) => (
                                        (fundingTypes.includes(id) === true ? null :
                                            <DropdownItem key={id} eventKey={id} onSelect={handleFundingTypeSelect}>
                                                {funding_type}
                                            </DropdownItem>
                                        )
                                    ))}
                                </DropdownButton>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Alert show={showColAlert} variant="danger">
                    <Alert.Heading>Are You Sure you want to delete FY'{columnToDelete}</Alert.Heading>
                    <Button variant="outline-danger" onClick={() => setShowColAlert(false)}>Cancel</Button>
                    <Button variant="outline-danger" onClick={DeleteCol}>Delete</Button>
                </Alert>
                <Alert show={showRowAlert} variant="danger">
                    <Alert.Heading>Are You Sure you want to delete funding type {allFundingTypes.map(({id, funding_type}) => (id === rowToDelete ? funding_type : null))}</Alert.Heading>
                    <Button variant="outline-danger" onClick={() => setShowRowAlert(false)}>Cancel</Button>
                    <Button variant="outline-danger" onClick={DeleteRow}>Delete</Button>
                </Alert>
                <Button className='Button' type="submit">Save Approved Funding Data</Button>
            </Form>
            
        </div>
    )
}