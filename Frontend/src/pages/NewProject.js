import React, { useState } from "react";
import "./page.css";
import { NavB } from "../components/NavB";
import { AddProject } from "../components/NewProject/AddProject";
import { FileUpload } from "../components/NewProject/FileUpload";
import { AddIPT } from "../components/NewProject/AddIPT";
import "../components/NewProject/newProject.css";
import { Predecessors } from "../components/NewProject/Predecessors";

function renderInfo(projectName, projectId) {
  console.log("project name: " + projectName);

  // if (projectName === "") {
  //   return <></>
  // } else {
    return <>
     <h2>{projectName} Project Information</h2>
      <br />
      <br />
      <h4>Upload Files:</h4>
      <div className='upload mx-auto'><FileUpload label={'WBS ProPricer table'} name={'propricerUpload'} projectId={projectId}/></div>
      <div className='upload'><FileUpload label={'Contract Award Timeline'} name={'contractAwardUpload'} projectId={projectId} /></div>
      <br />
      <h4>IPT Members:</h4>
      <div className="project-element">
        <AddIPT />
      </div>
      <br />
      <br />
      <h4>Dependencies</h4>
      <p>What projects does this project depend on?</p>
      <div className="project-element">
        <Predecessors />
      </div>
    </>
 // }
};

function NewProject() {
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState(0);

  const getProjectName = (id, name) => {
    setProjectName(name);
    console.log("In new project - childData: " + id + ", " + name);

    setProjectId(id);
  };

  return (
    <div className="lightBlue">
      <NavB />
      <h1>Add New Project</h1>
      <br />
      <div className="mx-auto w-75">
        <AddProject getProjectName={getProjectName}/>
      </div>
      <br />
      <br />
      {renderInfo(projectName, projectId)}
    </div>
  );
}

export default NewProject;
