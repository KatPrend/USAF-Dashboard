import React, { useState} from 'react';
import './page.css';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { NavB } from '../components/NavB';
import { UpdateContractors } from '../components/Admin/UpdateContractors';
import '../components/Admin/admin.css';
import { UpdateFunding } from '../components/Admin/UpdateFunding';
import { UpdateBranches } from '../components/Admin/UpdateBranches';
import { UpdateTitles } from '../components/Admin/UpdateTitles';
import { UpdateUsers } from '../components/Admin/UpdateUsers';

function Admin() {
    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");
    const [showContractor, setShowContractor] = useState(false);
    const [showFunding, setShowFunding] = useState(false);
    const [showBranch, setShowBranch] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    function handleShow(button) {
        setShowContractor(false);
        setShowFunding(false);
        setShowBranch(false);
        setShowTitle(false);
        setShowUsers(false);

        if (button === "Contractor") {
            setShowContractor(true);
        } else if (button === "Funding") {
            setShowFunding(true);
        } else if (button === "Branch") {
            setShowBranch(true);
        } else if (button === "Title") {
            setShowTitle(true);
        } else if (button === "User") {
            setShowUsers(true);
        }
    }
    
    return (
        <div className="lightBlue">
            <NavB getUserInfo={getUserInfo}/>
            {userRole !== "Admin" ? <div>You do not have access to this page.</div> : <div className='settings'>
                <Container>
                    <Row>
                        <Col xs={3} className="options">
                            <Row><span>Settings</span></Row>
                            <Row><ButtonGroup vertical>
                                <Button className="submit-new-project settings" onClick={() => {handleShow("Contractor")}}>Contractors</Button>
                                <Button className="submit-new-project settings" onClick={() => {handleShow("Funding")}}>Funding Types</Button>
                                <Button className="submit-new-project settings" onClick={() => {handleShow("Branch")}}>Branches</Button>
                                <Button className="submit-new-project settings" onClick={() => {handleShow("Title")}}>Military Job Titles</Button>
                                <Button className="submit-new-project settings" onClick={() => {handleShow("User")}}>Users</Button>
                            </ButtonGroup></Row>
                        </Col>
                        <Col className="edits">
                            <Row><span>Edit</span></Row>
                            <Row>{showContractor ? <UpdateContractors /> : null}</Row>
                            <Row>{showFunding ? <UpdateFunding /> : null}</Row>
                            <Row>{showBranch ? <UpdateBranches /> : null}</Row>
                            <Row>{showTitle ? <UpdateTitles /> : null}</Row>
                            <Row>{showUsers ? <UpdateUsers /> : null}</Row>
                        </Col>
                    </Row>
                </Container>
            </div>}
        </div>
    );
}

export default Admin;