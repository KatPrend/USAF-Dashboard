import React from "react";
import { Table } from 'react-bootstrap';


function DisplayFundingType(data){

    let arr = Object.keys(data[0])

    let index = arr.indexOf("FiscalYear")

    arr.splice(index, 1)

    return(
    arr.map( (key) => (
        <tr>
            <td>{key}</td>
            {data.map( (info) => (
                <td key = {info[key]}>{info[key]}</td>
            ))}
        </tr>
    ))
    
    )
}

export default function ApprovedFundingTable({data}){

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