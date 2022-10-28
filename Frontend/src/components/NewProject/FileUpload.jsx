import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Form, Row} from 'react-bootstrap';

export const FileUpload = (props) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(props.name, selectedFile);
        
       // ${props.projectId}

        axios.post(`/api/upload/${props.name}/1`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    return (
        <>
            <Form.Group as={Row} controlId="formFile" className="mb-3">
                <Form.Label column xs="auto">{props.label}:</Form.Label>
                <Col xs="auto">
                    <Form.Control type="file" name={props.name} onChange={changeHandler} />
                    { isSelected ? <Button className="submit-new-project" onClick={handleSubmission}>Upload File</Button> : null }
                </Col>
            </Form.Group>
        </>
    );
}

/*
SHOW FILE INFORMATION:
{isSelected ? (
    <div>
        <p>Filename: {selectedFile.name}</p>
        <p>Filetype: {selectedFile.type}</p>
        <p>Size in bytes: {selectedFile.size}</p>
        <p>
            lastModifiedDate:{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
        </p>
    </div>
) : (
    <p>Select a file to show details</p>
)}
*/