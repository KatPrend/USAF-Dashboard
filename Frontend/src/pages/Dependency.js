import React, { useState, useEffect } from 'react';
import axios from "axios";
import './page.css';
import { Col, Container, Button, Row, Table } from 'react-bootstrap';
import { CardGeneric } from '../components/CardGeneric'
import { useMsal } from "@azure/msal-react";
import { NavB } from '../components/NavB';
import { Sankey, Tooltip, Layer, Rectangle } from 'recharts';
import { DepSum } from '../components/Summaries/DepSum';

/**
* Renders information about projects assigned to the current user
*/
const ProjectContent = () => {
  const {accounts} = useMsal();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  // TODO: get backend help
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
          <Table responsive striped bordered hover className="bg-light">
              <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Dependent Milestone</th> 
                    <th>Date</th> 
                    <th>Leading Project</th>
                    <th>Leading Milestone</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Impact</th>
                  </tr>
              </thead>
              <tbody>
              {
                  data.map(({ id, project_name, dependent_milestone, dependent_milestone_date, leading_project, leading_milestone_date, status, impact }) => (
                      <tr key={id}>
                          <td>{id}</td>
                          <td>{project_name}</td>
                          <td>{dependent_milestone}</td>
                          <td>{dependent_milestone_date}</td>
                          <td>{leading_project}</td>
                          <td>{leading_milestone_date}</td>
                          <td>{status}</td>
                          <td>{impact}</td>
                      </tr>
                  ))
              }
              </tbody>
          </Table>
      </div>        
  );
}

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
      },
      {
        "name": "Project 6"
      },
      {
        "name": "Project 7"
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
        "source": 5,
        "target": 6,
        "value": 1  
      },
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

    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    return (
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo}/>
            <Container className="lightblue top-Padding" style={{height: '100vh'}}>
                <Row>
                    {/*1*/}
                    <Col>
                        <DepSum/>
                    </Col>
                    {/*2*/}
                    <Col>
                        <CardGeneric Header='Dependency Graph' Body={
                            <Sankey
                              width={500}
                              height={500}
                              data={data0}
                              node={<MyCustomNode />}
                              nodePadding={50}
                              margin={{
                              left: 100,
                              right: 100,
                              top: 100,
                              bottom: 100,
                              }}
                              link={{ stroke: '#77c878' }}>
                            </Sankey>}>
                        </CardGeneric>
                    </Col>
                </Row>
                <Row>
                  <ProjectContent/>
                </Row>
            </Container>
               
        </div>
    );
}

export default Dependency;