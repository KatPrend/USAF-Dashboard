import React, { useState } from "react";
import axios from "axios";

function PostExample() {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [contractStatus, setContractStatus] = useState("");
  const [branch, setBranch] = useState("");
  const [contractNum, setContractNum] = useState("");
  const [requirementType, setRequirementType] = useState("");
  const [summary, setSummary] = useState("");
  const [ccarNum, setCcar] = useState("");

  const handleProjectName = (e) => {
    setProjectName(e.target.value);
  };
  
  const handleProjectType = (e) => {
    setProjectType(e.target.value);
  };

  const handleContractStatus = (e) => {
    setContractStatus(e.target.value);
  };

  const handleBranch = (e) => {
    setBranch(e.target.value);
  };

  const handleContractNum = (e) => {
    setContractNum(e.target.value);
  };

  const handleRequirementType = (e) => {
    setRequirementType(e.target.value);
  };

  const handleSummary = (e) => {
    setSummary(e.target.value);
  };

  const handleCcar = (e) => {
    setCcar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Project Added")

      axios.post('/project', {
        project_name: projectName,
        project_type: projectType,
        contract_status: contractStatus,
        branch: branch,
        contract_num: contractNum,
        requirement_type: requirementType,
        summary: summary,
        ccar_num: ccarNum
      })
      .then(function(res){
        console.log(res);
      })
      .catch(function (err){
        console.log(err);
      });
  };

  return (
    <div className="Heading">
      <h1>Learning Client and Server Connection</h1>
      <div className="mx-auto w-75">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter projectName"
            type="projectName"
            onChange={handleProjectName}
          />
          <select
            placeholder=" Enter projectType"
            type="projectType"
            onChange={handleProjectType}>

            <option value="0">Nothing</option>
            <option value="1">Contract</option>
            <option value="2">MIPR</option>
          </select>
          <select
            placeholder=" Enter contractStatus"
            type="contractStatus"
            onChange={handleContractStatus}>

            <option value="0">Nothing</option>
            <option value="1">Pre-Awarded</option>
            <option value="2">Awarded</option>
            <option value="3">Closed</option>
          </select>
          <input
            placeholder=" Enter contractNum"
            type="contractNum"
            onChange={handleContractNum}
          />
          <input
            placeholder=" Enter branch"
            type="branch"
            onChange={handleBranch}
          />
          <select
            placeholder=" Enter RequirementType"
            type="RequirementType"
            onChange={handleRequirementType}>

            <option value="0">Nothing</option>
            <option value="1">CDD</option>
            <option value="2">CPD</option>
            <option value="3">1067</option>
            <option value="4">UON/JUONs</option>
          </select>
          <input
            placeholder=" Enter Summary"
            type="Summary"
            onChange={handleSummary}
          />
          <input
            placeholder=" Enter Ccar Number"
            type="Ccar"
            onChange={handleCcar}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostExample;
