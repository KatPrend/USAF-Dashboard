import React, { useState, useEffect } from "react";


function GetExample(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/projects`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((actualData) => {
      setData(actualData);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setData(null);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <h1>Projects</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {data &&
          data.map(({ project_id, project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num }) => (
              <li key={project_id}>
              <h3>ID:{project_id}  <br></br>
              Name: {project_name}  <br></br>
              Project Type: {project_type} <br></br>
              Contract Status: {contract_status} <br></br>
              Branch: {branch} <br></br>
              Contract Number: {contract_num} <br></br>
              Requirement Type: {requirement_type} <br></br>
              Summary: {summary} <br></br>
              CCAR Number: {ccar_num} <br></br>
              </h3>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default GetExample;