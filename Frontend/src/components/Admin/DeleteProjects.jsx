import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import "./admin.css";

export const DeleteProjects = () => {
    const [isLoading, setLoading] = useState(true);
    const [projects, setProjects] = useState();
    const [project, setProject] = useState(0);
    const [projectName, setProjectName] = useState("");
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        axios.get('/api/project/').then(response => {
            setProjects(response.data);
            setLoading(false);
        });
    }, []);

    let handleDropdown = (e) => {
        setDeleted(false);
        let projectInfo = e.target.value.split(',');
        setProjectName(projectInfo[0]);
        setProject(projectInfo[1]);

        console.log(projectInfo);
    }

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    let handleSubmit = (e) => {
        console.log(project);
        console.log(projectName);

        if (project !== 0) {
            axios.delete(`/api/project/${project}`, {
            })
            .then(function(res){
    
                axios.get('/api/project/').then(response => {
                    setProjects(response.data);
                    setLoading(false);
                });

                setProject(0);
                setDeleted(true);
            })
            .catch(function (err){
                console.log(err);
            });
        }
    }

    return (
        <div>
            <Container>
                <Row><h4 style={{marginBottom:"5%"}}>Delete Project</h4></Row>
                <Row>
                    <Form.Group>
                        <Col className="mx-auto" sm={4}>
                            <Form.Control as="select" onChange={handleDropdown}>
                                <option value={["undefined", "0"]}>Select Project</option>
                                {projects.map(({id, project_name}) => (
                                    <option value={[project_name, id]}>{project_name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Button className='submit-new-project admin mx-auto' onClick={handleSubmit}>Delete</Button>
                    {deleted ? <div>Successfully deleted {projectName}</div> : null}
                </Row>
            </Container>
        </div>
    )
}

/*
<h5 style={{marginTop:"3%", marginBottom:"3%"}}>Select Project:</h5>
<DropdownButton className="mx-auto" title="Projects">
    {projects.map(({id, project_name}) => (
        <Dropdown.Item key={id} eventKey={id} value={id} onSelect={handleDropdown}>
            {project_name}
        </Dropdown.Item>
    ))}
</DropdownButton>
*/