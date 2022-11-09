import React, { useState, useEffect, Row, Col, Alert } from "react";
import axios from "axios";
import { Table, Form, Button } from 'react-bootstrap';

export function ApprovedFundingTable({data, projectId}){

    const [isLoadingFY, setLoadingFY] = useState(true);
    const [isLoadingFundingTypes, setLoadingFundingTypes] = useState(true);
    const [isLoadingTotal, setLoadingTotal] = useState(true);
    const [FY, setFY] = useState();
    const [fundingTypes, setFundingTypes] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {
        axios.get(`/api/approved/fy/2`).then(response => {
            setFY(response.data);
            setLoadingFY(false);
        });
    }, []);

    useEffect(() => {
        axios.get(`/api/approved/fundingTypes/2`).then(response => {
            setFundingTypes(response.data);
            setLoadingFundingTypes(false);
        });
    }, []);


    

    useEffect(() => {

        axios.get(`/api/approved/total/2`, {
            funding_type: 1,
            fiscal_year: 22
        })
        .then(response => {
            setTotal(response.data);
            setLoadingTotal(false);
        });

    }, []);

    console.log("PROJECT ID IN APPROVED FUDNDING TBEL")
    console.log(projectId);


    if (isLoadingFY || isLoadingFundingTypes || isLoadingTotal) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    function FormatData(data){
        let arr = Object.keys(data[0])
        let index = arr.indexOf("FiscalYear")
        arr.splice(index, 1)
        return(arr)
    }



//     <tr>
//     <td key = "1" >Funding Type</td>
//     {data.map( (info) => (
//         <td key = {info.FiscalYear}>{info.FiscalYear}</td>
//     ))}
// </tr>
// {FormatData(data).map( (key) => (
//         <tr key={key}>
//             <td>{key}</td>
//             {data.map( (info) => (
//                 <td key = {info[key]}>{info[key]}</td>
//             ))}
//         </tr>
//     ))}

    return(
        <div>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                {
                    FY.map(({ FY }, index) => (
                        <tr key={index} >
                            <td>{FY}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    )
}




export function ApprovedFundingTableEditable({data}){
    const [editData, setEditData] = useState(data);
    const [columsEdited, setColumsEdited] = useState([]);
    const [showColAlert, setShowColAlert] = useState(false);
    const [showRowAlert, setShowRowAlert] = useState(false);
    const [columnToDelete, setColumnToDelete] = useState();
    const [rowToDelete, setRowToDelete] = useState();


    function FormatData(data){
        let arr = Object.keys(data[0])
        let index = arr.indexOf("FiscalYear")
        arr.splice(index, 1)
        return(arr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        editData.map((currRow, index) => (
            columsEdited.includes(index) === true ? console.log(currRow) : null
        ))

        setColumsEdited([]);
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
            index === row ? {...temp} : {...currObject}
        )))

    }

    const handleFundingType = (e, row, fundingType) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : null
        ))

        temp[fundingType] = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...temp} : {...currObject}
        )))
        
    }

    const handleAddCol = async (e) => {
        e.preventDefault();
    }

    const handleColAlert = (col) => {
        setColumnToDelete(col);
        setShowColAlert(true);
    }

    const DeleteCol = async (e, col) => {
        e.preventDefault();
    }

    const handleAddRow = async (e) => {
        e.preventDefault();
    }

    const handleRowAlert = (row) => {
        setRowToDelete(row);
        setShowRowAlert(true);
    }

    const DeleteRow = async (e, row) => {
        e.preventDefault();
    }


    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Table responsive striped bordered hover className="bg-light">
                    <tbody>
                        <tr>
                            <td> </td>
                            <td> </td>
                            {data.map( (info, index) => (
                                <td><Button className="Button" onClick={() => handleColAlert(index)}>Delete Column {index+1}</Button></td>
                            ))}
                            <td><Button className="Button" onClick={handleAddCol}>Add Column</Button></td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td key = "1" >Funding Type</td>
                            {editData.map( (info, index) => (
                                <td key = {index}>
                                    <Form.Group as={Row} key={index}>
                                        <Form.Label column sm={2}>FY'</Form.Label>
                                        <Col sm={5}>
                                            <Form.Control 
                                            defaultValue={info.FiscalYear}
                                            onChange={(e) => handleFiscalYear(e, index)}/>
                                        </Col>
                                    </Form.Group>
                                </td>
                            ))}
                        </tr>
                        {FormatData(editData).map( (key, index) => (
                            <tr key={key}>
                                <td><Button className="Button" onClick={() => handleRowAlert(index)}>Delete Row {index+1}</Button></td>
                                <td>{key}</td>
                                {editData.map( (info, index) => (
                                    <td key = {index}>
                                        <Form.Group key={index}>
                                            <Form.Control 
                                            defaultValue={info[key]}
                                            onChange={(e) => handleFundingType(e, index, key)}/>
                                        </Form.Group>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr><td><Button className="Button" onClick={handleAddRow}>Add Row</Button></td></tr>
                    </tbody>
                </Table>
                <Alert show={showColAlert} variant="danger">
                    <Alert.Heading>Are You Sure you want to delete column {columnToDelete+1}</Alert.Heading>
                    <Button variant="outline-danger" onClick={() => setShowColAlert(false)}>Cancel</Button>
                    <Button variant="outline-danger">Delete</Button>
                </Alert>
                <Alert show={showRowAlert} variant="danger">
                    <Alert.Heading>Are You Sure you want to delete row {rowToDelete+1}</Alert.Heading>
                    <Button variant="outline-danger" onClick={() => setShowRowAlert(false)}>Cancel</Button>
                    <Button variant="outline-danger">Delete</Button>
                </Alert>
                <Button className='Button' type="submit">Save Approved Funding Data</Button>
            </Form>
            
        </div>
    )
}