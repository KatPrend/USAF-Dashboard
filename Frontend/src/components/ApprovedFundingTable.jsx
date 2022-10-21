import React from "react";
import { Table } from 'react-bootstrap';


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
                    <tr>
                        <td key = "2">3600</td>
                        {data.map( (info) => (
                            <td key = {info.FiscalYear}>{info.data}</td>
                        ))}
                    </tr>
                    <tr>
                        <td key = "3">3080 BP10</td>
                        {data.map( (info) => (
                            <td key = {info.FiscalYear}>{info.d}</td>
                        ))}
                    </tr>
                    <tr>
                        <td key = "4" >3080 BP16</td>
                        {data.map( (info) => (
                            <td key = {info.FiscalYear}>{info.Projected}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}