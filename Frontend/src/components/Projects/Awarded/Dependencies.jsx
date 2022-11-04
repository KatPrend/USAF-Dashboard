import React, { useState} from 'react';
import { Button, Card, Col, Container, Row, Modal, ModalBody, ButtonGroup, ModalDialog, } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

export const Dependencies = (props) => {
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
        <ModalDialog scrollable>
            <Modal show={ModalIsOpen} size='xl' autoFocus={true}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col style={{textAlign: 'left'}}>
                                <h3>Project Dependencies Edit</h3>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <ButtonGroup className='CLIN-and-File-buttongroup'>
                                    <Button className='Button' onClick={()=>setModalIsOpen(false)}>Cancel</Button>
                                    <Button className='Button'>Save</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <Container>
                    </Container>
                </ModalBody>
            </Modal>
        </ModalDialog>


        <Card className="card">
            <Card.Header className = "cardHead">
                <Container>
                    <Row>
                        <Col style={{textAlign: 'left'}}>
                            <span>Project Dependencies</span>
                        </Col>
                        { props.userRole === "Contractor" ? null : <Col style={{textAlign: 'right'}}>
                                <span><Button className='Button' onClick={()=>setModalIsOpen(true)}>Edit</Button></span>
                            </Col>
                        }
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    placeholder text
                </Card.Text>
            </Card.Body>
        </Card>
        </>
        
    );
}