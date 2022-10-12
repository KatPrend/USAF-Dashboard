import React from "react";
import "./page.css"
import { NavB } from "../components/NavB";
import { AddProject } from "../components/NewProject/AddProject";
import { FileUpload } from "../components/NewProject/FileUpload";

function PostExample() {
  return (
    <div className="lightBlue">
      <NavB />
      <h1>Learning Client and Server Connection</h1>
      <div className="mx-auto w-75">
        <AddProject />
      </div>
      <br />
      <FileUpload />
    </div>
  );
}

export default PostExample;
