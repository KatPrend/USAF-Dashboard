import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import "./admin.css";

export const DeleteProjects = () => {
    const [isLoading, setLoading] = useState(true);
    const [projects, setProjects] = useState();
    const [project, setProject] = useState(0);

    useEffect(() => {
        axios.get('/api/project/').then(response => {
            setProjects(response.data);
            setLoading(false);
        });
    }, []);

    let handleDropdown = (e) => {
        setProject(e);
    }

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    return (
        <div>
            <Container>
                <Row><h4>Delete Project</h4></Row>
                <Row>
                    <h5 style={{marginTop:"3%", marginBottom:"3%"}}>Select Project:</h5>
                    <DropdownButton className="mx-auto" title="Projects">
                        {projects.map(({id, project_name}) => (
                            <Dropdown.Item key={id} eventKey={id} value={id} onSelect={handleDropdown}>
                                {project_name}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Row>
            </Container>
        </div>
    )
}