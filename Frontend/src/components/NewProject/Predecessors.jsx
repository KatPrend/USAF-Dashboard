import React, { useState } from "react";
import axios from "axios";
import {Button, Col, Form, Row} from 'react-bootstrap';

export const Predecessors = () => {

    const [predecessors, setPredecessors] = useState([projectId: "", projectName: ""]);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('/api/project/').then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    let handleChange = (i, e) => {
        
    }

    let addPred = () => {
        
    }

    let removePred = (i) => {
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: Add Post request
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group key={index}>
                <Form.Label column xs="auto">What projects does this project depend on ? {'('}Predecessors{')'}: </Form.Label>
                <Form.Control as="select" type="text" name="type" placeholder="Enter IPT Member Type" onChange={e => handleChange(index, e)}>
                    {data.map((element, index) => (
                        <option key={index} value={index}>{element.project_name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
        </Form>
    );
}