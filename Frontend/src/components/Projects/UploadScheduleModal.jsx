import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Table, Modal, ModalBody, ButtonGroup, ModalDialog, Form } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { format } from 'date-fns';
import { FileUpload } from "../NewProject/FileUpload";

export const UploadScheduleModal = (props) => {

    return (
        <ModalDialog scrollable>
            <Modal show={props.open} size='xl' autoFocus={true}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col style={{textAlign: 'left'}}>
                                <h3>Upload Project Schedule Milestones</h3>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button' onClick={()=>props.getOpenUploadModal(false)}>Done</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <div className='upload mx-auto'><FileUpload label={'Milestones Import'} name={'milestonesUpload'} projectId={props.projectId}/></div>
                </ModalBody>
            </Modal>
        </ModalDialog>
    )
}