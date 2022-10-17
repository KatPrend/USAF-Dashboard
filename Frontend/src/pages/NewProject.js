import React, { useState } from "react";
import "./page.css"
import { NavB } from "../components/NavB";
import { AddProject } from "../components/NewProject/AddProject";
import { FileUpload } from "../components/NewProject/FileUpload";
import { ProjectDates } from "../components/NewProject/ProjectDates";
import { AddIPT } from "../components/NewProject/AddIPT";
import "../components/NewProject/newProject.css";

function renderDates(projectName) {
  console.log("project name: " + projectName);

  if (projectName === "") {
    return <></>
  } else {
    return <>
      <br />
      <br />
      <br />
      <div className="project-element">
        <ProjectDates />
      </div>
    </>
  }
};

function renderProPricerUpload(projectName) {
  console.log("project name: " + projectName);

  if (projectName === "") {
    return <></>
  } else {
    return <>
      <br />
      <br />
      <div className="project-element">
        <FileUpload label={'WBS ProPricer table'} name={'uploadfile'}/>
      </div>
    </>
  }
};

function renderIPT(projectName) {
  console.log("project name: " + projectName);

  if (projectName === "") {
    return <></>
  } else {
    return <>
      <br />
      <h4>IPT Members:</h4>
      <div className="project-element">
        <AddIPT />
      </div>
    </>
  }
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
      <h2>{projectId}: {projectName} Project Information</h2>
      {renderDates(projectName)}
      {renderProPricerUpload(projectName)}
      {renderIPT(projectName)}
    </div>
  );
}

export default NewProject;
