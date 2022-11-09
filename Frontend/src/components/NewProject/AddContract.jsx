import React, { useState } from "react";
import axios from "axios";
import {Button, Col, Form, Row} from 'react-bootstrap';

export const AddContract = (props) => {
  const [contractStatus, setContractStatus] = useState(1);
  const [contractNum, setContractNum] = useState("");
  
  const handleContractStatus = (e) => {
    setContractStatus(e.target.value);
  };
  const handleContractNum = (e) => {
    setContractNum(e.target.value);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      let projectId = props.data;

      axios.post('/api/contract', {
        project_id: projectId,
        contract_status: contractStatus,
        contract_num: contractNum
      })
      .then(function(res){
        console.log(res);

        props.getContractStatus(contractStatus);
        props.getShowLink(true);
      })
      .catch(function (err){
          console.log(err);
      }); 
  };

  return (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Contract Status:</Form.Label>
          <Col sm={7}>
            <Form.Control 
              as="select"
              defaultValue={1}
              type="contractStatus"
              onChange={handleContractStatus}>

              <option value="1">Pre-Awarded</option>
              <option value="2">Awarded</option>
              <option value="3">Closed</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Contract Number:</Form.Label>
          <Col sm={7}>
            <Form.Control
              placeholder=" Enter contractNum"
              type="contractNum"
              onChange={handleContractNum}
            />
          </Col>
        </Form.Group>
        <br />
        <Button type="submit" className="submit-new-project">
          Submit New Contract
        </Button>
      </Form>
  );
}