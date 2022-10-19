import React from "react";
import { Table } from 'react-bootstrap';


export default function ApprovedFundingTable({data}){

    return(
        <div>
            <Table responsive striped bordered hover className="bg-light">
                <tbody>
                    <tr>
                        <td>Funding Type</td>
                        {data.map( (info) => (
                            <td>{info.FiscalYear}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3600</td>
                        {data.map( (info) => (
                            <td>{info.data}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3080 BP10</td>
                        {data.map( (info) => (
                            <td>{info.d}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3080 BP16</td>
                        {data.map( (info) => (
                            <td>{info.Projected}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}