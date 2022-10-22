import React from "react";
import { Table } from 'react-bootstrap';


export default function FundingDataTable({data}){

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