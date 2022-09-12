import React, { useState } from "react";


function PostExample() {
  const [projectName, setProjectName] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  
  const handleProjectName = (e) => {
    setProjectName(e.target.value);
  };
  
  const handleProjectDuration = (e) => {
    setProjectDuration(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("User Added")
    const userData = {
      projectName: projectName,
      projectDuration: projectDuration,
    };
   try{
    const add = await fetch("/help", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  console.log(add)
   }catch(err){
     console.error()
   }
  };
  return (
    <div className="Heading">
      <h1>Learning Client and Server Connection</h1>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter projectName"
            type="projectName"
            onChange={handleProjectName}
          />
          <input
            placeholder=" Enter projectDuration"
            type="projectDuration"
            onChange={handleProjectDuration}
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
