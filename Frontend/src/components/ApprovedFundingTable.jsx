import React from "react";
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

    function FormatData(data){
        let arr = Object.keys(data[0])
        let index = arr.indexOf("FiscalYear")
        arr.splice(index, 1)
        return(arr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("1");
    }

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Button className='Button' type="submit">Save Approved Funding Data</Button>
                <Table responsive striped bordered hover className="bg-light">
                    <tbody>
                        <tr>
                            <td key = "1" >Funding Type</td>
                            {data.map( (info) => (
                                <td key = {info.FiscalYear}>
                                    <Form.Group>
                                        <Form.Control defaultValue={info.FiscalYear}/>
                                    </Form.Group>
                                </td>
                            ))}
                        </tr>
                        {FormatData(data).map( (key) => (
                            <tr key={key}>
                                <td>{key}</td>
                                {data.map( (info) => (
                                    <td key = {info[key]}>
                                        <Form.Group>
                                            <Form.Control defaultValue={info[key]}/>
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