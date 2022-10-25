import React from "react";
import { Table, Form } from 'react-bootstrap';


function DisplayFundingType(data){

    let arr = Object.keys(data[0])

    let index = arr.indexOf("FiscalYear")

    arr.splice(index, 1)

    return(
    arr.map( (key) => (
        <tr key={key}>
            <td>{key}</td>
            {data.map( (info) => (
                <td key = {info[key]}>{info[key]}</td>
            ))}
        </tr>
    ))
    
    )
}

export function ApprovedFundingTable({data}){

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
                    {DisplayFundingType(data)}
                </tbody>
            </Table>
        </div>
    )
}


function DisplayFundingTypeEditable(data){

    let arr = Object.keys(data[0])

    let index = arr.indexOf("FiscalYear")

    arr.splice(index, 1)

    return(
    arr.map( (key) => (
        <tr key={key}>
            <td>{key}</td>
            {data.map( (info) => (
                <td key = {info[key]}>
                    <Form>
                        <Form.Control defaultValue={info[key]}/>
                    </Form>
                </td>
            ))}
        </tr>
    ))
    
    )
}


export function ApprovedFundingTableEditable({data}){

    return(
        <div>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                    <tr>
                        <td key = "1" >Funding Type</td>
                        {data.map( (info) => (
                            <td key = {info.FiscalYear}>
                                <Form>
                                    <Form.Control defaultValue={info.FiscalYear}/>
                                </Form>
                            </td>
                        ))}
                    </tr>
                    {DisplayFundingTypeEditable(data)}
                </tbody>
            </Table>
        </div>
    )
}