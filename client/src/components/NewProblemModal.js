import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NewProblemModal(props) {
    const formStyle = {
        marginBottom: "2.5%"
    }
    
    return(
        <Modal size="lg" centered backdrop="static" show={props.show} onHide={() => props.handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Problem</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Label>Problem Number</Form.Label>
                <Form.Control type="text" placeholder="Enter problem number..." style={formStyle}/>
                <Form.Label>Problem Name</Form.Label>
                <Form.Control type="text" placeholder="Enter problem name..." style={formStyle}/>
                <Form.Label>Problem Difficulty</Form.Label>
                <Form.Select style={formStyle}>
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                </Form.Select>
                <Form.Label>Tags</Form.Label>
                <div className="add-tag-form">
                    <Form.Control type="text" placeholder="Enter a tag..." style={{marginRight: "2.5%"}}/>
                    <Button variant="dark" style={{width: "25%"}}>Add</Button>
                </div>
                <p>Enter problem text:</p>
                <ReactQuill theme="snow" style={formStyle}/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" style={{width: "15%"}} onClick={() => props.handleClose()}>Close</Button>
                <Button variant="primary" style={{width: "15%"}}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}