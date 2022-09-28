import React from 'react';
import './page.css';
import { Card, Col, Container, Button, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Clin() {
    return (
        <body className="lightBlue">
            <div className="d-flex justify-content-between p-2">
                <h2>Projects:</h2>
                <Button>Add Project</Button>
            </div>
                <Table striped bordered hover className="bg-light">
                    <thead>
                        <tr>
                            <th>CLIN Number</th>
                            <th>CLIN Type</th>
                            <th>CLIN Scope</th>
                            <th>Projected CLIN Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>FFP</td>
                            <td>Item 1 and Item 2</td>
                            <td>$5,021,921</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>T&M</td>
                            <td>Item 1</td>
                            <td>$2,331,074</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Cr</td>
                            <td>Item 2</td>
                            <td>$9,000,001</td>
                        </tr>
                    </tbody>
                </Table>
        </body>
    );
}

export default Clin;