import React, { useState, useEffect } from "react";
import { Table, Form, Button } from 'react-bootstrap';




export function ApprovedFundingTable({data}){

    function FormatData(data){
        let arr = Object.keys(data[0])
        let index = arr.indexOf("FiscalYear")
        arr.splice(index, 1)
        return(arr)
    }

    return(
        <div>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                    <tr>
                        <td key = "1" >Funding Type</td>
                        {data.map( (info) => (
                            <td key = {info.FiscalYear}>{info.FiscalYear}</td>
                        ))}
                    </tr>
                    {FormatData(data).map( (key) => (
                            <tr key={key}>
                                <td>{key}</td>
                                {data.map( (info) => (
                                    <td key = {info[key]}>{info[key]}</td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    )
}




export function ApprovedFundingTableEditable({data}){
    const [editData, setEditData] = useState(data);
    const [columsEdited, setColumsEdited] = useState([]);


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
            index === row ? temp = currObject : temp = temp
        ))

        temp.FiscalYear = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))

    }

    const handleFundingType = (e, row, fundingType) => {
        if(columsEdited.includes(row) === false){
            setColumsEdited([...columsEdited, row])
        }
        
        var temp;

        editData.map((currObject, index) => (
            index === row ? temp = currObject : temp = temp
        ))

        temp[fundingType] = e.target.value;
        
        setEditData(editData.map((currObject, index) =>(
            index === row ? {...currObject, temp} : {...currObject}
        )))
        
    }


    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Button className='Button' type="submit">Save Approved Funding Data</Button>
                <Table responsive striped bordered hover className="bg-light">
                    <tbody>
                        <tr>
                            <td key = "1" >Funding Type</td>
                            {editData.map( (info, index) => (
                                <td key = {index}>
                                    <Form.Group key={index}>
                                        <Form.Control 
                                        defaultValue={info.FiscalYear}
                                        onChange={(e) => handleFiscalYear(e, index)}/>
                                    </Form.Group>
                                </td>
                            ))}
                        </tr>
                        {FormatData(editData).map( (key) => (
                            <tr key={key}>
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
                    </tbody>
                </Table>
            </Form>
            
        </div>
    )
}