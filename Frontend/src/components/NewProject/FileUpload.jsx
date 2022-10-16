import React, { useState } from "react";
import axios from "axios";

export const FileUpload = (props) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = async (e) => {
        const formData = new FormData();
        formData.append(props.name, selectedFile);

        // TODO: Make post request to send file to backend
        axios.post('/api/upload/' + props.name, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    return (
        <div>
            <input type="file" name={props.name} onChange={changeHandler} />
            <div>
                <button className="submit-new-project" onClick={handleSubmission}>Upload</button>
            </div>
        </div>
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