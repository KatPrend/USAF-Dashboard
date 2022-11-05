import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Form, Table } from 'react-bootstrap';
import { format } from 'date-fns';


export function ExpenditureFundingDataTable({data}){

    return(
        <div>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                    <tr>
                        <td> </td>
                        {data.map( (info, index) => (
                            <td key={index} >{info.date}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Projected</td>
                        {data.map( (info, index) => (
                            <td  key = {index} >{info.Projected}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Actual</td>
                        {data.map( (info, index) => (
                            <td  key = {index} >{info.Actual}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export function ObligationFundingDataTable({data}){

    return(
        <div>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                    <tr>
                        <td> </td>
                        {data.map( (info, index) => (
                            <td key={index} >{info.date}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Funding Type</td>
                        {data.map( (info, index) => (
                            <td  key = {index} >{info.FundingType}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Fiscal Year</td>
                        {data.map( (info, index) => (
                            <td  key = {index} >{info.FiscalYear}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Projected</td>
                        {data.map( (info, index) => (
                            <td  key = {index} >{info.Projected}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Actual</td>
                        {data.map( (info, index) => (
                            <td  key = {index} >{info.Actual}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}


export function ExpenditureFundingDataTableEditable({data}){

    const[editData, setEditData] = useState();
    const[columsEdited, setColumsEdited] = useState([]);
    const[showAlert, setShowAlert] = useState(false);
    const[columnToDelete, setColumnToDelete] = useState();

    useEffect(() => {
        setEditData(data);
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        editData.map((currRow, index) => (
            columsEdited.includes(index) === true ? console.log(currRow) : null
        ))

        setColumsEdited([]);

    }

    const handleDate = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp.date = e.target.value;
        
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
            index === row ? temp = currObject : null
        ))

        temp.Projected = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleActual = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }

        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp.Actual = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleAddCol = async (e) => {
        e.preventDefault();
    }

    const handleDeletCol = (row) => {
        setColumnToDelete(row);
        setShowAlert(true);
    }

    const DeleteCol = async (e, row) => {
        e.preventDefault();
    }


    return(
        <>
        <Form onSubmit={handleSubmit}>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                    <tr>
                        <td> </td>
                        {data.map( (info, index) => (
                            <td><Button className="Button" onClick={() => handleDeletCol(index)}>Delete Column {index+1}</Button></td>
                        ))}
                        <td><Button className="Button" onClick={handleAddCol}>Add Column</Button></td>
                    </tr>
                    <tr>
                        <td key="top"> </td>
                        {data.map( (info, index) => (
                            <td key={index}>
                                <Form.Group key={index}>
                                    <Form.Control 
                                    value={format(new Date(info.date), 'yyyy-MM-dd')} 
                                    type='date'
                                    onChange={(e) => handleDate(e, index)}/>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                    <tr  >
                        <td>Projected</td>
                        {data.map( (info, index) => (
                            <td key={index}>
                                <Form.Group key={index}>
                                    <Form.Control 
                                    defaultValue={info.Projected}
                                    onChange={(e) => handleProjected(e, index)}/>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Actual</td>
                        {data.map( (info, index) => (
                            <td  key = {index} >
                                <Form.Group key={index}>
                                    <Form.Control 
                                    defaultValue={info.Actual}
                                    onChange={(e) => handleActual(e, index)}/>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </Table>
            <Alert show={showAlert} variant="danger">
                <Alert.Heading>Are You Sure you want to delete column {columnToDelete+1}</Alert.Heading>
                <Button variant="outline-danger" onClick={() => setShowAlert(false)}>Cancel</Button>
                <Button variant="outline-danger">Delete</Button>
            </Alert>
            <Button className='Button' type="submit">Save Expenditure Data</Button>
        </Form>
        </>
        
    )
}

export function ObligationFundingDataTableEditable({data}){

    const[editData, setEditData] = useState();
    const[columsEdited, setColumsEdited] = useState([]);
    const[showAlert, setShowAlert] = useState(false);
    const[columnToDelete, setColumnToDelete] = useState();


    useEffect(() => {
        setEditData(data);
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        editData.map((currRow, index) => (
            columsEdited.includes(index) === true ? console.log(currRow) : null
        ))

        setColumsEdited([]);

    }

    const handleDate = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
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
            index === row ? temp = currObject : null
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
            index === row ? temp = currObject : null
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
            index === row ? temp = currObject : null
        ))

        temp.Projected = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleActual = (e, row) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }

        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp.Actual = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }

    const handleAddCol = async (e) => {
        e.preventDefault();
    }

    const handleDeletCol = (row) => {
        setColumnToDelete(row);
        setShowAlert(true);
    }

    const DeleteCol = async (e, row) => {
        e.preventDefault();
    }

    return(
        <Form  onSubmit={handleSubmit}>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                    <tr>
                        <td> </td>
                        {data.map( (info, index) => (
                            <td><Button className="Button" onClick={() => handleDeletCol(index)}>Delete Column {index+1}</Button></td>
                        ))}
                        <td><Button className="Button" onClick={handleAddCol}>Add Column</Button></td>
                    </tr>
                    <tr>
                        <td key="top"> </td>
                        {data.map( (info, index) => (
                            <td key={index}>
                                <Form.Group key={index}>
                                    <Form.Control 
                                    value={format(new Date(info.date), 'yyyy-MM-dd')} 
                                    type='date'
                                    onChange={(e) => handleDate(e, index)}/>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Funding Type</td>
                        {data.map( (info, index) => (
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
                        {data.map( (info, index) => (
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
                        {data.map( (info, index) => (
                            <td key={index}>
                                <Form.Group key={index}>
                                    <Form.Control 
                                    defaultValue={info.Projected}
                                    onChange={(e) => handleProjected(e, index)}/>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Actual</td>
                        {data.map( (info, index) => (
                            <td  key = {index} >
                                <Form.Group key={index}>
                                    <Form.Control 
                                    defaultValue={info.Actual}
                                    onChange={(e) => handleActual(e, index)}/>
                                </Form.Group>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </Table>
            <Alert show={showAlert} variant="danger">
                <Alert.Heading>Are You Sure you want to delete column {columnToDelete+1}</Alert.Heading>
                <Button variant="outline-danger" onClick={() => setShowAlert(false)}>Cancel</Button>
                <Button variant="outline-danger">Delete</Button>
            </Alert>
            <Button className='Button' type="submit">Save Obligation Data</Button>
        </Form>
    )
}