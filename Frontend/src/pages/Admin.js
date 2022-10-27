import React, { useState, useEffect } from 'react';
import './page.css';
import { Button, ButtonGroup, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { NavB } from '../components/NavB';
import { UpdateContractors } from '../components/Admin/UpdateContractors';
import '../components/Admin/admin.css';
import { UpdateRequirements } from '../components/Admin/UpdateRequirements';
import { UpdateBranches } from '../components/Admin/UpdateBranches';
import { UpdateTitles } from '../components/Admin/UpdateTitles';

function Admin() {
    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");
    const [showContractor, setShowContractor] = useState(false);
    const [showRequirement, setShowRequirement] = useState(false);
    const [showBranch, setShowBranch] = useState(false);
    const [showTitle, setShowTitle] = useState(false);

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    function handleShow(button) {
        setShowContractor(false);
        setShowRequirement(false);
        setShowBranch(false);
        setShowTitle(false);

        if (button === "Contractor") {
            setShowContractor(true);
        } else if (button === "Requirement") {
            setShowRequirement(true);
        } else if (button === "Branch") {
            setShowBranch(true);
        } else if (button === "Title") {
            setShowTitle(true);
        }
    }
    
    return (
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo}/>
            {userRole != "Admin" ? <div>You do not have access to this page.</div> : <div className='settings'>
                <Container>
                    <Row>
                        <Col xs={3} className="options">
                            <Row><span>Settings</span></Row>
                            <Row><ButtonGroup vertical>
                                <Button className="submit-new-project settings" onClick={() => {handleShow("Contractor")}}>Contractors</Button>
                                <Button className="submit-new-project settings" onClick={() => {handleShow("Requirement")}}>Requirement Types</Button>
                                <Button className="submit-new-project settings" onClick={() => {handleShow("Branch")}}>Branches</Button>
                                <Button className="submit-new-project settings" onClick={() => {handleShow("Title")}}>Military Job Titles</Button>
                            </ButtonGroup></Row>
                        </Col>
                        <Col className="edits">
                            <Row><span>Edit</span></Row>
                            <Row>{showContractor ? <UpdateContractors /> : null}</Row>
                            <Row>{showRequirement ? <UpdateRequirements /> : null}</Row>
                            <Row>{showBranch ? <UpdateBranches /> : null}</Row>
                            <Row>{showTitle ? <UpdateTitles /> : null}</Row>
                        </Col>
                    </Row>
                </Container>
            </div>}
        </div>
    );
}

export default Admin;