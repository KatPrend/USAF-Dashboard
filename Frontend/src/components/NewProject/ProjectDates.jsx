import React, { useState } from "react";
import axios from "axios";
import {Button, Col, Form, Row} from 'react-bootstrap';

export const ProjectDates = () => {

    const [projectStart, setProjectStart] = useState("");
    const [projectEnd, setProjectEnd] = useState("");

    const handleProjectStart = (e) => {
        setProjectStart(e.target.value);
    };
    
    const handleProjectEnd = (e) => {
        setProjectEnd(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(projectStart + " to " + projectEnd);

        // TODO: Add Post Request
    };

    return (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column xs="auto">Start Date:</Form.Label>
            <Col xs="auto">
              <Form.Control
                placeholder="Start Date"
                type="date"
                value={projectStart}
                onChange={handleProjectStart}
              />
            </Col>
            <Form.Label column xs="auto">End Date:</Form.Label>
            <Col xs="auto">
              <Form.Control
                placeholder="End Date"
                type="date"
                value={projectEnd}
                onChange={handleProjectEnd}
              />
            </Col>
            <Col xs="auto">
                <Button type="submit" className="submit-new-project">
                    Set Project Dates
                </Button>
            </Col>
          </Form.Group>
        </Form>
    );
}