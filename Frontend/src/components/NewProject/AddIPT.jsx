import React, { useEffect, useState } from "react";
import axios from "axios";
import {Button, Col, Form, Row} from 'react-bootstrap';

export const AddIPT = () => {

    const [members, setMembers] = useState([{type: "", first: "", last: "", email: ""}]);
    const [isLoading, setLoading] = useState(true);
    const [jobTitles, setJobTitles] = useState();

    useEffect(() => {
        axios.get('/api/mjt/milJobs/').then(response => {
            setJobTitles(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

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

        // console.log(JSON.stringify(members));

        // TODO: Add Post request
    };

    return (
        <Form onSubmit={handleSubmit}>
            {members.map((element, index) => (
                <div className="form-inline" key={index}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={5}>Member Type:</Form.Label>
                        <Col sm={7}>
                            <Form.Control as="select" type="text" name="type" placeholder="Enter IPT Member Type" onChange={e => handleChange(index, e)}>
                                {jobTitles.map((element, index) => (
                                    <option value={index}>{element.mil_job_title}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={5}>First Name:</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="text" name="first" value={element.first || ""} placeholder="End First Name" onChange={e => handleChange(index, e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={5}>Last Name:</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="text" name="last" value={element.last || ""} placeholder="Enter Last Name" onChange={e => handleChange(index, e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={5}>Email:</Form.Label>
                        <Col sm={6}>
                            <Form.Control type="text" name="email" value={element.email || ""} placeholder="Enter Email" onChange={e => handleChange(index, e)} />
                            {index ? <Button className="submit-new-project" onClick={() => removeMembers(index)}>Remove</Button> : null}
                        </Col>
                    </Form.Group>
                    <br />
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