import React from "react";
import { Table } from 'react-bootstrap';


export default function FundingDataTable({data}){

    return(
        <div>
            <Table responsive>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Funding Type</td>
                    </tr>
                    <tr>
                        <td>Fiscal Year</td>
                    </tr>
                    <tr>
                        <td>Projected</td>
                    </tr>
                    <tr>
                        <td>Actual</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}