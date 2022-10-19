import React, { useState } from "react";
import axios from "axios";
import {Button, Col, Form, Row} from 'react-bootstrap';

export const AddIPT = () => {

    const [members, setMembers] = useState([{type: "", first: "", last: "", email: ""}]);

    let handleChange = (i, e) => {
        let newMembers = [...members];
        newMembers[i][e.target.name] = e.target.value;
        setMembers(newMembers);
    }

    let addMembers = () => {
        setMembers([...members, {type: "", first: "", last: ""}])
    }

    let removeMembers = (i) => {
        let newMembers = [...members];
        newMembers.splice(i, 1);
        setMembers(newMembers);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(JSON.stringify(members));

        // TODO: Add Post request
    };

    return (
        <Form onSubmit={handleSubmit}>
            {members.map((element, index) => (
                <div className="form-inline" key={index}>
                    <Form.Group as={Row}>
                        <Form.Label column xs="auto">Member Type:</Form.Label>
                        <Col xs="auto">
                            <Form.Control as="select" type="text" name="type" placeholder="Enter IPT Member Type" onChange={e => handleChange(index, e)}>
                                <option value="0">V</option>
                                <option value="1">Project Manager</option>
                                <option value="2">Primary Engineer</option>
                                <option value="3">Primary Logistics</option>
                                <option value="4">GFE/GFP POC</option>
                                <option value="5">Contracting</option>
                                <option value="6">Financial Analyst</option>
                                <option value="7">Cost Analyst</option>
                                <option value="8">Reviewing Supervisor/PM</option>
                                <option value="9">Secondary Engineer</option>
                                <option value="10">Det 3</option>
                                <option value="11">Configuration/Data Management</option>
                                <option value="12">IPMR/IMS</option>
                                <option value="13">Cybersecurity</option>
                            </Form.Control>
                        </Col>
                        <Form.Label column xs="auto">First Name:</Form.Label>
                        <Col xs="auto">
                            <Form.Control type="text" name="first" value={element.first || ""} placeholder="End First Name" onChange={e => handleChange(index, e)} />
                        </Col>
                        <Form.Label column xs="auto">Last Name:</Form.Label>
                        <Col xs="auto">
                            <Form.Control type="text" name="last" value={element.last || ""} placeholder="Enter Last Name" onChange={e => handleChange(index, e)} />
                        </Col>
                        <Col xs="auto">
                            <Form.Control type="text" name="email" value={element.email || ""} placeholder="Enter Email" onChange={e => handleChange(index, e)} />
                        </Col>
                        <Col xs="auto">
                            {index ? <Button className="submit-new-project" onClick={() => removeMembers(index)}>Remove</Button> : null}
                        </Col>
                    </Form.Group>
                </div>
            ))}
            <br />
            <div className="button-section">
                <Button className="submit-new-project" type="button" onClick={() => addMembers()}>Add</Button>
                <Button className="submit-new-project" type="submit">Submit</Button>
            </div>
        </Form>
    );
}