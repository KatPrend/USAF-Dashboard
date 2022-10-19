import React, { useState } from "react";
import axios from "axios";
import {Button, Col, Form, Row} from 'react-bootstrap';

export const AddIPT = () => {

    const [members, setMembers] = useState([{type: "", first: "", last: ""}]);

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
                            <Form.Control type="text" name="type" value={element.type || ""} placeholder="Enter IPT Member Type" onChange={e => handleChange(index, e)} />
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