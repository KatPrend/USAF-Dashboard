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
import { Redirect } from 'react-router-dom';

/**
* Renders information about projects assigned to the current user
*/
const ProjectContent = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [predProj, setPredProj] = useState('');
  const [predMil, setPredMil] = useState('');
  const [predStart, setPredStart] = useState('');
  const [predEnd, setPredEnd] = useState('');
  const [succProj, setSuccProj] = useState('');
  const [succMil, setSuccMil] = useState('');
  const [succStart, setSuccStart] = useState('');
  const [succEnd, setSuccEnd] = useState('');

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

  const safeToString = (input) => {
    if (input === null)
        return 'null';
    if (input === undefined)
        return 'undefined';
    return input.toString();
  }

  const shouldDisplay = (pred_proj_name, pred_name, pred_start, pred_end, succ_proj_name, succ_name, succ_start, succ_end) => {
    // if x does not contain the xSearch and xSearch is not empty
    if (!(safeToString(pred_proj_name).toLowerCase().includes(predProj.toLowerCase())) && predProj !== '')
        return false;
    if (!(safeToString(pred_name).toLowerCase().includes(predMil.toLowerCase())) && predMil !== '')
        return false;
    if (!(safeToString(pred_start).toLowerCase().includes(predStart.toLowerCase())) && predStart !== '')
        return false;
    if (!(safeToString(pred_end).toLowerCase().includes(predEnd.toLowerCase())) && predEnd !== '')
        return false;
    if (!(safeToString(succ_proj_name).toLowerCase().includes(succProj.toLowerCase())) && succProj !== '')
        return false;
    if (!(safeToString(succ_name).toLowerCase().includes(succMil.toLowerCase())) && succMil !== '')
        return false;
    if (!(safeToString(succ_start).toLowerCase().includes(succStart.toLowerCase())) && succStart !== '')
        return false;
    if (!(safeToString(succ_end).toLowerCase().includes(succEnd.toLowerCase())) && succEnd !== '')
        return false;
    return true;
  }

  return (
      <div style={{width:"100%"}}>
          <Table responsive striped bordered hover className="bg-light" style={{width:"100%"}}>
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
                  <tr>
                    <td><input placeholder="Filter by Project" style={{width: '100%'}} type='text' onChange={function (event) {setPredProj(event.target.value)}} value={predProj}></input></td>
                    <td><input placeholder="Filter by Milestone" style={{width: '100%'}} type='text' onChange={function (event) {setPredMil(event.target.value)}} value={predMil}></input></td>
                    <td><input placeholder="Filter by Start" style={{width: '100%'}} type='text' onChange={function (event) {setPredStart(event.target.value)}} value={predStart}></input></td>
                    <td><input placeholder="Filter by End" style={{width: '100%'}} type='text' onChange={function (event) {setPredEnd(event.target.value)}} value={predEnd}></input></td>
                    <td><input placeholder="Filter by Project" style={{width: '100%'}} type='text' onChange={function (event) {setSuccProj(event.target.value)}} value={succProj}></input></td>
                    <td><input placeholder="Filter by Milestone" style={{width: '100%'}} type='text' onChange={function (event) {setSuccMil(event.target.value)}} value={succMil}></input></td>
                    <td><input placeholder="Filter by Start" style={{width: '100%'}} type='text' onChange={function (event) {setSuccStart(event.target.value)}} value={succStart}></input></td>
                    <td><input placeholder="Filter by End" style={{width: '100%'}} type='text' onChange={function (event) {setSuccEnd(event.target.value)}} value={succEnd}></input></td>
                  </tr>
              {
                  data.map(({ pred_proj_name, pred_name,  pred_proj_start, pred_proj_end, pred_actual_start, pred_actual_end, succ_proj_name, succ_name, succ_start, succ_end, succ_proj_start, succ_proj_end, succ_actual_start,  succ_actual_end }, index) => (
                      <tr style={shouldDisplay(pred_proj_name, pred_name, format(new Date(pred_proj_start), 'MM/dd/yyyy'), format(new Date(pred_proj_end), 'MM/dd/yyyy'),
                                               succ_proj_name, succ_name, format(new Date(succ_proj_start), 'MM/dd/yyyy'), format(new Date(succ_proj_end), 'MM/dd/yyyy')) ? {} : {display : "none"}} key={index}>
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
//console.log("Ganttyy");
//console.log(JsonData);
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
  //console.log("Rows")
  //console.log(Rows)

  const data = [columns, ...Rows];
  //console.log("final DATA for ganttyytrtt")
  //console.log(data);

  return (data);
}

const getOptions = (cHeight) => {
    const options = {
        gantt: {
            criticalPathEnabled: false,
            criticalPathStyle: {
                stroke: "#e64a19",
            },  
        },
        height: cHeight
      };
    return options;
}

const Dependency = (props) => {

    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");
    const [data, setData] = useState(0)
    const [redirect, setRedirect] = useState(0)
    
    let chartHeight = 0;

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);

        console.log("userid: " + uid);
    }
    function refreshPage() {
        window.location.replace('/dependency');
      }
    useEffect(() => {
        setTimeout(() => {
            console.log("in useeffect")
            console.log(props.firstLoad)
          if(props.firstLoad === 1)
          {
            refreshPage();
          }
        }, 10);
      }, []); // <- add empty brackets here

      if (data !== 0 && data.length > 0) {
        chartHeight = data.length * 100;
      }
    
      return ( 
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo}/>
            <Container className="top-Padding" style={{marginBottom: '3%'}}>
                {/*1*/}
                <Row>
                    
                    {userid !== 0 && userRole !== "" ? <DepSum userid={userid} userRole={userRole}/> : <div className="mx-auto"> Loading...</div>}
                </Row>
                {/*2*/}
                <Row>
                    {chartHeight === 0 ? null : <CardGeneric Header='Dependency Graph' 
                    Body={ data === 0 || data.length === 0 ? <div>No Dependency Data, make sure you are assigned to projects</div> :
                        <Chart
                        chartType='Gantt'
                        width="100%" 
                        height="100%"
                        options={getOptions(chartHeight)}
                        data={GanttChartDataFormat(data)}
                        />
                        }>
                    </CardGeneric>}
                </Row>
            </Container>
            {console.log("FirstLoad: " + props.firstLoad)}
            {props.firstLoad === 1 && redirect ? <Redirect to="/dependency"/> : null}
            {userid !== 0 && userRole !== "" ? <ProjectContent userid={userid} dataSetter={setData}/> : null }

        </div>
    );
}

export default Dependency;