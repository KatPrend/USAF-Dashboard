import React, { useState, useEffect } from 'react';
import axios from "axios";
import './page.css';
import {Link} from 'react-router-dom';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { CardGeneric } from '../components/CardGeneric'
import { NavB } from '../components/NavB';
import { DepSum } from '../components/Summaries/DepSum';
import { format } from 'date-fns';
import { Chart } from "react-google-charts";

/**
* Renders information about projects assigned to the current user
*/
const ProjectContent = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  console.log(props.userid);
  console.log(props.userRole);

    if(props.userRole === "Admin"){
        useEffect(() => {
            axios.get(`/api/dependency/adminSuccessor`).then(response => {
                setData(response.data);
                props.dataSetter(response.data);
                setLoading(false);
            });
        }, []);
    } else {
        useEffect(() => {
            axios.get(`/api/dependency/userSuccessor/${props.userid}`).then(response => {
                setData(response.data);
                props.dataSetter(response.data);
                setLoading(false);
            });
        }, []);
    }

  if (isLoading) {
      return <div className="mx-auto w-75">Loading...</div>;
  }

  return (
      <div className="mx-auto w-75">
          <Table responsive striped bordered hover className="bg-light">
              <thead>
                  <tr>
                    <th>Predecessor Project</th>
                    <th>Predecessor Milestone</th> 
                    <th>Predecessor Projected Start Date</th> 
                    <th>Predecessor Projected End Date</th>
                    <th>Predecessor Actual Start Date</th> 
                    <th>Predecessor End Date</th>
                    <th>Successor Project</th>
                    <th>Successor Milestone</th>
                    <th>Successor Projected Start Date</th>
                    <th>Successor Projected End Date</th>
                    <th>Successor Actual Start Date</th>
                    <th>Successor Actual End Date</th>
                  </tr>
              </thead>
              <tbody>
              {
                  data.map(({ pred_proj_name, pred_name, pred_proj_start, pred_proj_end, pred_actual_start, pred_actual_end, succ_proj_name, succ_name, succ_proj_start, succ_proj_end, succ_actual_start,  succ_actual_end}, index) => (
                      <tr key={index}>
                          <td>{pred_proj_name}</td>
                          <td>{pred_name}</td>
                          <td>{format(new Date(pred_proj_start), 'MM/dd/yyyy')}</td>
                          <td>{format(new Date(pred_proj_end), 'MM/dd/yyyy')}</td>
                          <td>{pred_actual_start !== null ? format(new Date(pred_actual_start), 'MM/dd/yyyy') : "No Date" }</td>
                          <td>{pred_actual_end !== null ? format(new Date(pred_actual_end), 'MM/dd/yyyy') : "No Date" }</td>
                          <td>{succ_proj_name}</td>
                          <td>{succ_name}</td>
                          <td>{format(new Date(succ_proj_start), 'MM/dd/yyyy')}</td>
                          <td>{format(new Date(succ_proj_end), 'MM/dd/yyyy')}</td>
                          <td>{succ_actual_start !== null ? format(new Date(succ_actual_start), 'MM/dd/yyyy') : "No Date" }</td>
                          <td>{succ_actual_end !== null ? format(new Date(succ_actual_end), 'MM/dd/yyyy') : "No Date" }</td>
                      </tr>
                  ))
              }
              </tbody>
          </Table>
      </div>        
  );
}

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

function GanttChartDataFormat(JsonData) {
console.log("Ganttyy");
console.log(JsonData);
    var Rows = [];
    
  JsonData.map(({ pred_proj_name, pred_name,  pred_proj_start, pred_proj_end, pred_actual_start, pred_actual_end, succ_proj_name, succ_name, succ_start, succ_end, succ_proj_start, succ_proj_end, succ_actual_start,  succ_actual_end }) => {
      Rows.push([
        pred_name,
        pred_name,
        pred_actual_start !== null ? new Date(pred_actual_start) : new Date(pred_proj_start),
        pred_actual_end !== null ? new Date(pred_actual_end) : new Date(pred_proj_end),
        null,
        null,
        null
      ])
      Rows.push([
        succ_name,
        succ_name,
        succ_actual_start !== null ? new Date(succ_actual_start) : new Date(succ_proj_start),
        succ_actual_end !== null ? new Date(succ_actual_end) : new Date(succ_proj_end),
        null,
        null,
        pred_name
      ])
      return 0;
  })
  console.log("Rows")
  console.log(Rows)

  const data = [columns, ...Rows];
  console.log("final DATA for ganttyytrtt")
  console.log(data);

  return (data);
}

const options = {
  gantt: {
      criticalPathEnabled: false,
      criticalPathStyle: {
          stroke: "#e64a19",
      },  
  },
};

function Dependency() {

    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");
    const [data, setData] = useState(0);

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);

        console.log("userid: " + uid);
    }
    
    return (
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo}/>
            <Container className="top-Padding" style={{marginBottom: '3%'}}>
                <Row>
                    {/*1*/}
                    <Col>
                    {userid !== 0 && userRole !== "" ? <DepSum userid={userid} userRole={userRole}/> : <div className="mx-auto"> Loading...</div>}
                    
                    </Col>
                    {/*2*/}
                    <Col>
                        <CardGeneric Header='Dependency Graph' 
                        Body={ data === 0 || data.length === 0 ? <div>No Dependency Data, make sure you are assigned to projects</div> :
                            <Chart
                            chartType='Gantt'
                            width="100%" 
                            height="100%"
                            options={options}
                            data={GanttChartDataFormat(data)}
                            />
                         }>
                        </CardGeneric>
                    </Col>
                </Row>
            </Container>

            {userid !== 0 && userRole !== "" ? <ProjectContent userid={userid} userRole={userRole} dataSetter={setData}/> : <></> }

        </div>
    );
}

export default Dependency;