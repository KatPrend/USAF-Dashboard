import React, { useState, useEffect } from 'react';
import axios from "axios";
import './page.css';
import { Col, Container, Button, Row, Table } from 'react-bootstrap';
import { CardGeneric } from '../components/CardGeneric'
import { useMsal } from "@azure/msal-react";
import { NavB } from '../components/NavB';
import { Sankey, Tooltip, Layer, Rectangle } from 'recharts';
import {Link} from 'react-router-dom';

/*
function renderContent(contractStatus, projectId, projectName) {
  if(contractStatus === "Awarded"){
      return <Link to={{ 
          pathname: "/awardedproject", 
          state: {id:projectId} // your data array of objects
      }}
    >{projectName}</Link>
  }
  else if (contractStatus === "Pre-Award"){
      return <Link to={{ 
          pathname: "/preawardproject", 
          state: {id:projectId} // your data array of objects
      }}
    >{projectName}</Link>
  }
};

 // Renders information about projects assigned to the current user
 
 const ProjectContent = () => {
    const {accounts} = useMsal();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/project/userEmail/${accounts[0].username}`).then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-75">Loading...</div>;
    }

    return (
        <div className="mx-auto w-75">
            <br />
            <br />
            <h2>Projects: <Link to="/newProject"><Button className='submit-new-project main'>Add Project</Button></Link></h2>
            <Table striped bordered hover className="bg-light">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Contract Number</th>
                        <th>Contract Status</th>
                        <th>Org/Branch</th>
                        <th>Contract Value</th>
                        <th>Dependency Status</th>
                        <th>Financial Status</th>
                        <th>Schedule Status</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map(({ project_id, project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num, }) => (
                        <tr key={project_id}>
                            <td> {renderContent(contract_status,project_id,project_name)}</td>
                            <td>{contract_num}</td>
                            <td>{contract_status}</td>
                            <td>{branch}</td>
                            <td>On track</td>
                            <td>On track</td>
                            <td>On track</td>
                            <td>On track</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>        
    );
}

/*
<th>Project Name</th>
<th>Dependent Milestone</th>
<th>Date</th>
<th>Leading Project</th>
<th>Leading Milestone</th>
<th>Date</th>
<th>Status</th>
<th>Impact</th>
*/

const data0 = {
    "nodes": [
      {
        "name": "Project 1"
      },
      {
        "name": "Project 2"
      },
      {
        "name": "Project 3"
      },
      {
        "name": "Project 4"
      },
      {
        "name": "Project 5"
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "value": 1
      },
      {
        "source": 1,
        "target": 2,
        "value": 1
      },

      {
        "source": 1,
        "target": 3,
        "value": 1
      },
      {
        "source": 1,
        "target": 4,
        "value": 1
      }
    ]
  };
  
  
  
  const MyCustomNode = ({
    x,  
    y,
    width,
    height,
    index,
    payload,
    containerWidth,
  }) => {
    const isOut = x + width + 6 > containerWidth;
    return (
      <Layer key={`CustomNode${index}`}>
        <Rectangle
          x={x}
          y={y}
          width={width}
          height={height}
          fill="#5192ca"
          fillOpacity="1"
        />
        <text
          textAnchor={isOut ? 'end' : 'start'}
          x={isOut ? x - 6 : x + width + 6}
          y={y + height / 2}
          fontSize="14"
          stroke="#333"
        >
          { payload.name }
        </text>
      </Layer>
    );
  };
  
                              

function Dependency() {

    return (
        <div className="lightBlue">
            <NavB/>
            <Container className="lightblue top-Padding" style={{height: '100vh'}}>
                <Row>
                    {/*1*/}
                    <Col>
                        <CardGeneric Header='Dependency Summary' Body='Placeholder text lives here!'></CardGeneric>
                    </Col>
                    {/*2*/}
                    <Col>
                        <CardGeneric Header='Dependency Graph' Body={
                            <Sankey
                              width={960}
                              height={500}
                              data={data0}
                              node={<MyCustomNode />}
                              nodePadding={50}
                              margin={{
                              left: 200,
                              right: 200,
                              top: 100,
                              bottom: 100,
                              }}
                              link={{ stroke: '#77c878' }}>
                            </Sankey>}>
                        </CardGeneric>
                    </Col>
               </Row>

            </Container>
               
        </div>
    );
}

export default Dependency;