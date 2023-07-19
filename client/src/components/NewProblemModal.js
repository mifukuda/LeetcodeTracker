import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createProblem } from "../api";
import { SuccessModal } from ".";

export default function NewProblemModal(props) {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState(1);
    const [description, setDescription] = useState("");
    const [html, setHtml] = useState("");
    const [success, setSuccess] = useState(false);

    function handleClick() {
        try {
            createProblem ({
                number: number,
                name: name,
                tags: [],
                difficulty: difficulty,
                description: description,
                html: html
            }).then((response) => {
                if(response.status === 201) {
                    props.handleClose();
                    setSuccess(true);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    function handleChangeNumber(event) {
        setNumber(event.target.value);
    }

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeDifficulty(event) {
        setDifficulty(event.target.value);
    }

    function handleChangeDescription(content, delta, source, editor) {
        setDescription(editor.getText());
        setHtml(content);
    }

    function closeSuccessModal() {
        props.updateList();
        setSuccess(false);
    }

    const formStyle = {
        marginBottom: "2.5%"
    }
    
    return(
        <div>
            <Modal size="lg" centered backdrop="static" show={props.show} onHide={() => props.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Problem</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{paddingTop: "2.5%", paddingBottom: "2.5%", paddingRight: "5%", paddingLeft: "5%"}}>
                    <Form.Label>Problem Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter problem number..." style={formStyle} onChange={(event) => handleChangeNumber(event)}/>
                    <Form.Label>Problem Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter problem name..." style={formStyle} onChange={(event) => handleChangeName(event)}/>
                    <Form.Label>Problem Difficulty</Form.Label>
                    <Form.Select style={formStyle} onChange={(event) => handleChangeDifficulty(event)}>
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
                    <ReactQuill theme="snow" style={formStyle} onChange={(content, delta, source, editor) => handleChangeDescription(content, delta, source, editor)}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" style={{width: "15%"}} onClick={() => props.handleClose()}>Close</Button>
                    <Button variant="primary" style={{width: "15%"}} onClick={() => handleClick()}>Save</Button>
                </Modal.Footer>
            </Modal>
            <SuccessModal show={success} handleClose={closeSuccessModal} successMessage={"New Problem Added!"} 
                bodyMessage={`New problem "` + number + ". " + name + `" has been successfully added to your problem list. You can now add solutions and run tests!`}/>
        </div>
    )
}