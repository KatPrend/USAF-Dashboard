import React, { useState} from 'react';
import './page.css';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { NavB } from '../components/NavB';
import { UpdateContractors } from '../components/Admin/UpdateContractors';
import '../components/Admin/admin.css';
import { UpdateFunding } from '../components/Admin/UpdateFunding';
import { UpdateFinancialBreakpoints } from '../components/Admin/UpdateFinancialBreakpoints';
import { UpdateBranches } from '../components/Admin/UpdateBranches';
import { UpdateTitles } from '../components/Admin/UpdateTitles';
import { UpdateUsers } from '../components/Admin/UpdateUsers';
import { DeleteProjects } from '../components/Admin/DeleteProjects';

function Admin() {
    const [userid, setUserid] = useState(0);
    const [userRole, setUserRole] = useState("");
    const [selectedOption, setSelectedOption] = useState("none")

    const getUserInfo = (uid, urole) => {
        setUserid(uid);
        setUserRole(urole);
    }

    function renderBody() {

        if (selectedOption === "Contractor") {
            return <UpdateContractors />;
        } else if (selectedOption === "Funding") {
            return <UpdateFunding />;
        } else if (selectedOption === "Financial Breakpoints") {
            return <UpdateFinancialBreakpoints />;
        } else if (selectedOption === "Branch") {
            return <UpdateBranches />;
        } else if (selectedOption === "Title") {
            return <UpdateTitles />;
        } else if (selectedOption === "User") {
            return <UpdateUsers />;
        } else if (selectedOption === "Project") {
            return <DeleteProjects />;
        }
        // default msg
        return <div>Select a setting to edit</div>
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
                                <Button className="submit-new-project settings" onClick={() => {setSelectedOption("Contractor")}}>Contractors</Button>
                                <Button className="submit-new-project settings" onClick={() => {setSelectedOption("Funding")}}>Funding Types</Button>
                                <Button className="submit-new-project settings" onClick={() => {setSelectedOption("Financial Breakpoints")}}>Financial Summary Breakpoints</Button>
                                <Button className="submit-new-project settings" onClick={() => {setSelectedOption("Branch")}}>Branches</Button>
                                <Button className="submit-new-project settings" onClick={() => {setSelectedOption("Title")}}>Military Job Titles</Button>
                                <Button className="submit-new-project settings" onClick={() => {setSelectedOption("User")}}>Users</Button>
                                <Button className="submit-new-project settings" onClick={() => {setSelectedOption("Project")}}>Projects</Button>
                            </ButtonGroup></Row>
                        </Col>
                        <Col className="edits">
                            <Row><span>Edit</span></Row>
                            <Row>{renderBody()}</Row>
                        </Col>
                    </Row>
                </Container>
            </div>}
        </div>
    );
}

export default Admin;