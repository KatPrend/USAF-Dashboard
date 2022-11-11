import React from "react";
import { Button, Col, Container, Row, Modal, ModalBody, ButtonGroup, ModalDialog } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { FileUpload } from "../NewProject/FileUpload";

export const NewWBSModal = (props) => {

    return (
        <ModalDialog scrollable>
            <Modal show={props.open} size='xl' autoFocus={true}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col style={{textAlign: 'left'}}>
                                <h3>Upload ProPricer Output</h3>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button' onClick={()=>props.getOpenWBSModal(false)}>Done</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <div className='upload mx-auto'><FileUpload label={'WBS ProPricer table'} name={'propricerUpload'} projectId={props.projectId}/></div>
                </ModalBody>
            </Modal>
        </ModalDialog>
    )
}