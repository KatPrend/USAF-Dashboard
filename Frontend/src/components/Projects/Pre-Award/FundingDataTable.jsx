import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table, Form, Button, Alert, Row, Col} from 'react-bootstrap';
import { format } from 'date-fns';
import axios from "axios";


export function FundingDataTable({data}){

    const [allFundingTypes, setAllFundingTypes] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/fundingType/').then(response => {
            setAllFundingTypes(response.data);
            setLoading(false);
        });
    }, []);

    function getFundingType(info){
        let retVal = 0;

        allFundingTypes.map(({id, funding_type}) => (
            <>{id === parseInt(info.FundingType) ? retVal = funding_type : null}</>
        ))

        return(retVal)
    }

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    return(
        <div>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                    <tr>
                        <td key="top"> </td>
                        {data.map( (info, index) => (
                            <td key={index}>{info.date.replace(/-/g, '\/').replace(/T.+/, '')}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Funding Type</td>
                        {data.map( (info, index) => (
                            <td key={index}>{getFundingType(info)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Fiscal Year</td>
                        {data.map( (info, index) => (
                            <td key={index}>FY'{info.FiscalYear}</td>
                        ))}
                    </tr>
                    <tr  >
                        <td>Projected</td>
                        {data.map( (info, index) => (
                            <td key={index}>{info.Projected}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}


export function FundingDataTableEditable(props){

    const [editData, setEditData] = useState(props.data);
    const [columsEdited, setColumsEdited] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [columnToDelete, setColumnToDelete] = useState();
    const [reload, setReload] = useState(false);
    const [allFundingTypes, setAllFundingTypes] = useState();
    const [isLoading, setLoading] = useState(true);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        axios.get('/api/fundingType/').then(response => {
            setAllFundingTypes(response.data);
            setLoading(false);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        editData.map((currRow, index) => (
            columsEdited.includes(index) === true ? 
            axios.put('/api/obligation', {
                id: currRow.id,
                project_id: props.id,
                obli_funding_date: currRow.date.replace(/T.+/, ''),
                obli_funding_type: currRow.FundingType,
                obli_fiscal_year: currRow.FiscalYear,
                obli_projected: currRow.Projected,
                obli_actual: currRow.Actual
            })  
            : null
        ))

        setColumsEdited([]);
        setReload(true);

    }

    const handleDate = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : temp = temp
        ))

        temp.date = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleFundingType = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : temp = temp
        ))

        temp.FundingType = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleFiscalYear = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : temp = temp
        ))

        temp.FiscalYear = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleProjected = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : temp = temp
        ))

        temp.Projected = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleAddCol = async (e) => {
        e.preventDefault();

        handleSubmit(e);

        axios.post('/api/obligation', {
            project_id: props.id,
            obli_funding_date: format(new Date(Date.now()), 'yyyy-MM-dd'),
            obli_funding_type: 0,
            obli_fiscal_year: 0,
            obli_projected: 0,
            obli_actual: null
        }).then(function (res) {
            setReload(true);
        });
    }

    const handleDeletCol = (row) => {
        setColumnToDelete(row);
        setShowAlert(true);
    }

    const DeleteCol = async (e) => {
        e.preventDefault();

        handleSubmit(e);

        editData.map((info, index) => (
            index === columnToDelete ? 
                axios.delete(`/api/obligation/${info.id}`)
            :
            null
        ))
        setShowAlert(false);
        setReload(true);
    }

    if(reload){
        axios.get(`/api/obligation/getObli/${props.id}`).then(response =>{
            setEditData(response.data);
        }).then(function (res) {
            setReload(false);
        });
    }

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Alert show={showSuccessAlert} variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                <Alert.Heading>Saved Obligation Data</Alert.Heading>
                <p>
                    Successfully saved obligation data.
                </p>
            </Alert>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                    <tr>
                        <td> </td>
                        {editData.map( (info, index) => (
                            <td><Button className="Button" onClick={() => handleDeletCol(index)}>Delete Column {index+1}</Button></td>
                        ))}
                        <td><Button className="Button" onClick={handleAddCol}>Add Column</Button></td>
                    </tr>
                    <tr>
                        <td key="top"> </td>
                        {editData.map( (info, index) => (
                            <td key={index}>
                                <Form.Group key={index}>
                                    <Form.Control 
                                    value={info.date.replace(/T.+/, '')} 
                                    type='date'
                                    onChange={(e) => handleDate(e, index)}/>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Funding Type</td>
                        {editData.map( (info, index) => (
                            <td key={index}>
                                <Form.Group key={index}>
                                    <Form.Control 
                                    as="select"
                                    value={info.FundingType}
                                    onChange={(e) => handleFundingType(e, index)}>

                                    <option value={0}>Select</option>
                                    {allFundingTypes.map(({id, funding_type}) => (
                                        <option key={id} value={id}>{funding_type}</option>
                                    ))}
                                    </Form.Control>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Fiscal Year</td>
                        {editData.map( (info, index) => (
                            <td key={index}>
                                <Form.Group as={Row} key={index}>
                                    <Form.Label column sm={2}>
                                        FY'
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control 
                                        type="number"
                                        value={info.FiscalYear}
                                        onChange={(e) => handleFiscalYear(e, index)}/>
                                    </Col>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                    <tr  >
                        <td>Projected</td>
                        {editData.map( (info, index) => (
                            <td key={index}>
                                <Form.Group key={index}>
                                    <Form.Control 
                                    type="number"
                                    value={info.Projected}
                                    onChange={(e) => handleProjected(e, index)}/>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </Table>
            <Alert show={showAlert} variant="danger">
                <Alert.Heading>Are You Sure you want to delete column {columnToDelete+1}</Alert.Heading>
                <Button variant="outline-danger" onClick={() => setShowAlert(false)}>Cancel</Button>
                <Button variant="outline-danger" onClick={DeleteCol}>Delete</Button>
            </Alert>
            <Button className='Button' onClick={() => setShowSuccessAlert(true)} type="submit">Save Obligation Data</Button>
        </Form>
    )
}

