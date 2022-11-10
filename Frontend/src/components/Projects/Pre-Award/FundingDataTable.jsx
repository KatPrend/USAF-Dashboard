import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table, Form, Button, Alert} from 'react-bootstrap';
import { format } from 'date-fns';
import axios from "axios";


export function FundingDataTable({data}){

    return(
        <div>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                    <tr>
                        <td key="top"> </td>
                        {data.map( (info, index) => (
                            <td key={index}>{info.date}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Funding Type</td>
                        {data.map( (info, index) => (
                            <td key={index}>{info.FundingType}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Fiscal Year</td>
                        {data.map( (info, index) => (
                            <td key={index}>{info.FiscalYear}</td>
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
    const[showAlert, setShowAlert] = useState(false);
    const[columnToDelete, setColumnToDelete] = useState();



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(editData);
        
        editData.map((currRow, index) => (
            columsEdited.includes(index) === true ? 
            axios.put('/api/obligation', {
                id: currRow.id,
                project_id: props.id,
                obli_funding_date: format(new Date(currRow.date), 'yyyy-MM-dd'),
                obli_funding_type: currRow.FundingType,
                obli_fiscal_year: currRow.FiscalYear,
                obli_projected: currRow.Projected,
                obli_actual: currRow.Actual
            })  
            : null
        ))

        setColumsEdited([]);

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

        axios.post('/api/obligation', {
            project_id: props.id,
            obli_funding_date: format(new Date(null), 'yyyy-MM-dd'),
            obli_funding_type: 0,
            obli_fiscal_year: 0,
            obli_projected: 0,
            obli_actual: 0
        })
    }

    const handleDeletCol = (row) => {
        setColumnToDelete(row);
        setShowAlert(true);
    }

    const DeleteCol = async (e, row) => {
        e.preventDefault();

        editData.map((info, index) => (
            index === columnToDelete ? 
                axios.delete(`/api/obligation/${info.id}`)
            :
            null
        ))
        setShowAlert(false)
    }

    return(
        <Form onSubmit={handleSubmit}>
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
                                    defaultValue={format(new Date(info.date), 'yyyy-MM-dd')} 
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
                                    defaultValue={info.FundingType}
                                    onChange={(e) => handleFundingType(e, index)}/>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Fiscal Year</td>
                        {editData.map( (info, index) => (
                            <td key={index}>
                                <Form.Group key={index}>
                                    <Form.Control 
                                    defaultValue={info.FiscalYear}
                                    onChange={(e) => handleFiscalYear(e, index)}/>
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
                                    defaultValue={info.Projected}
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
                <Button variant="outline-danger" onclick={DeleteCol}>Delete</Button>
            </Alert>
            <Button className='Button' type="submit">Save Obligation Data</Button>
        </Form>
    )
}

