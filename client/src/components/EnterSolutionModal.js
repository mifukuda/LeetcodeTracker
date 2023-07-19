import React, {useState} from "react";
import { useSelector } from "react-redux";
import { SuccessModal } from '.';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createSolution } from "../api";

// Screen for pasting solution into textbox and saving
export default function EnterSolutionModal(props) {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [timeComplexity, setTimeComplexity] = useState("");
    const [spaceComplexity, setSpaceComplexity] = useState("");
    const [code, setCode] = useState("");
    const [success, setSuccess] = useState(false);
    const extensions = [python()];
    const problem = useSelector(state => state.currentProblem);

    function handleClick() {
        createSolution({
            problemId: problem._id,
            number: number,
            name: name,
            timeComplexity: timeComplexity,
            spaceComplexity: spaceComplexity,
            code: code
        }).then((response) => {
            if(response.status === 201) {
                props.handleClose();
                setSuccess(true);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleChangeNumber(event) {
        setNumber(event.target.value);
    }

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeTimeComplexity(event) {
        setTimeComplexity(event.target.value);
    }

    function handleChangeSpaceComplexity(event) {
        setSpaceComplexity(event.target.value);
    }

    function handleChangeCode(value, viewUpdate) {
        setCode(value);
    }

    function closeSuccessModal() {
        setSuccess(false);
    }
    const formStyle = {
        marginBottom: "2.5%"
    }

    return(
        <div>
            <Modal dialogClassName="modal-90w" centered backdrop="static" show={props.show} onHide={() => props.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Solution</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{paddingTop: "2.5%", paddingBottom: "2.5%", paddingRight: "5%", paddingLeft: "5%"}}>
                    <Form.Label>Solution Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter solution number..." style={formStyle} onChange={(event) => handleChangeNumber(event)}/>
                    <Form.Label>Solution Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter solution name..." style={formStyle} onChange={(event) => handleChangeName(event)}/>
                    <Form.Label>Time Complexity</Form.Label>
                    <Form.Control type="text" placeholder="Enter time complexity..." style={formStyle} onChange={(event) => handleChangeTimeComplexity(event)}/>
                    <Form.Label>Space Complexity</Form.Label>
                    <Form.Control type="text" placeholder="Enter space complexity..." style={formStyle} onChange={(event) => handleChangeSpaceComplexity(event)}/>
                    <Form.Label>Code</Form.Label>
                    <CodeMirror
                        height="700px"
                        extensions={extensions}
                        onChange={(value, viewUpdate) => {handleChangeCode(value, viewUpdate)}}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" style={{width: "15%"}} onClick={() => props.handleClose()}>Close</Button>
                    <Button variant="primary" style={{width: "15%"}} onClick={() => handleClick()}>Save</Button>
                </Modal.Footer>
            </Modal>
            <SuccessModal show={success} handleClose={closeSuccessModal} successMessage={"New Solution Added!"} 
                bodyMessage={`New solution "` + number + ". " + name + `" has been successfully added to your solution list. You can now execute this solution if a test has been added.`}/>
        </div>
    )
}