import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table, Form, Button } from 'react-bootstrap';
import { format } from 'date-fns';


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


export function FundingDataTableEditable({data}){

    const [editData, setEditData] = useState();
    const [columsEdited, setColumsEdited] = useState([]);

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

    return(
        <Form onSubmit={handleSubmit}>
            <Button className='Button' type="submit">Save Obligation Data</Button>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
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
                </tbody>
            </Table>
        </Form>
    )
}

