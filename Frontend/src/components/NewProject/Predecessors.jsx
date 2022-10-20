import React, { useState, useEffect } from "react";
import axios from "axios";
import {Button, Col, Form, Row} from 'react-bootstrap';
import { element } from "prop-types";

export const Predecessors = () => {

    const [predecessors, setPredecessors] = useState([{projectId: "", projectName: ""}]);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('/api/project/').then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    let handleChange = (i, e) => {
        let project_info = e.target.value.split(",");

        let newPred = [...predecessors];
        newPred[i]["projectId"] = project_info[0];
        newPred[i]["projectName"] = project_info[1];
        setPredecessors(newPred);

        console.log("predecessors - project id: " + newPred[i]["projectId"] + ", project name: " + newPred[i]["projectName"])
    }

    let addPred = () => {
        setPredecessors([...predecessors, {projectId: "", projectName: ""}])
    }

    let removePred = (i) => {
        let newPred = [...predecessors];
        newPred.splice(i, 1);
        setPredecessors(newPred);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();

        console.log(JSON.stringify(predecessors));

        // TODO: Add Post request
    };

    return (
        <Form onSubmit={handleSubmit}>
            {predecessors.map((predElement, predInd) => (
                <Form.Group as={Row} key={predInd}>
                    <Form.Label column sm="auto">Add Dependency: </Form.Label>
                    <Col xs="auto">
                        <Form.Control as="select" type="text" name="projectName" placeholder="" onChange={e => handleChange(predInd, e)}>
                            <option key={0} value={0}></option>
                            {data.map((element, index) => (
                                <option key={element.project_id} value={[element.project_id, element.project_name]}>{element.project_name}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col xs="auto">
                        {predInd ? <Button className="submit-new-project" onClick={() => removePred(predInd)}>Remove</Button> : null}
                    </Col>
                </Form.Group>
            ))}
            <br />
            <div className="button-section">
                <Button className="submit-new-project" type="button" onClick={() => addPred()}>Add Predecessor Project</Button>
                <Button className="submit-new-project" type="submit">Submit Dependencies</Button>
            </div>
        </Form>
    );
}