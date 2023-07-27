import React, {useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { useSelector } from 'react-redux';
import { getOutput, updateSolutionById } from "../api";

export default function SolutionCard(props) {
    const extensions = [python()];

    const solution = props.solution;
    const problem = useSelector(state => state.currentProblem);
    const [showTerminal, setShowTerminal] = useState(false);
    const [terminalText, setTerminalText] = useState("");
    // value shown in CodeMirror
    const [solutionText, setSolutionText] = useState(solution.code);
    // value in database
    const [actualSolutionText, setActualSolutionText] = useState(solution.code);
    // editing CodeMirror
    const [editingSolution, setEditingSolution] = useState(false);

    // Run the solution on backend and display output
    function handleRun() {
        getOutput(problem._id, solution._id)
        .then((response) => {
            if(response.status === 200) {
                console.log(response.data);
                setShowTerminal(true);
                setTerminalText(new Date().toLocaleString() + "\nRunning Tests...\n\n" + response.data.output);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    function handleEdit() {
        setEditingSolution(true);
    }

    function handleChangeSolution(value, viewUpdate) {
        setSolutionText(value);
    }

    function handleClickCancel() {
        setSolutionText(actualSolutionText);
        setEditingSolution(false);
    }

    function handleClickSave() {
        updateSolutionById(solution._id,
                {
                    code: solutionText
                }
            ).then((response) => {
            if(response.status === 200) {
                setActualSolutionText(solutionText);
                setEditingSolution(false);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    // Display if test-text is being edited
    let saveButton = <Button variant="primary" size="lg" style={{width: "20%", fontWeight: "bold"}} onClick={() => handleClickSave()}>Save</Button>
    let cancelButton = <Button variant="secondary" size="lg" style={{width: "20%", fontWeight: "bold"}} onClick={() => handleClickCancel()}>Cancel</Button>
        

    const dateCreated = new Date(solution.createdAt).toLocaleString();
    const dateModified = new Date(solution.updatedAt).toLocaleString();

    let terminal = null;
    if(showTerminal) {
        terminal =
        <div className="terminal">
            {terminalText}
        </div>
    }

    return (
        <Accordion.Item eventKey={props.index}>
            <Accordion.Header>
                <h4 className="solution-card-header">{solution.number}. {solution.name}</h4> 
            </Accordion.Header>
            <Accordion.Body>
                <h5 className="solution-card-subheader">Created on: {dateCreated}; &emsp; Last modified: {dateModified}</h5>
                <h5 className="solution-card-subheader">Time Complexity: {solution.timeComplexity}; &emsp; Space Complexity: {solution.spaceComplexity}</h5>
                <h5 className="solution-card-subheader">Code:</h5>
                <CodeMirror
                    height="500px"
                    extensions={extensions}
                    value={solutionText}
                    editable={editingSolution}
                    onChange={(value, viewUpdate) => {handleChangeSolution(value, viewUpdate)}}
                />
                <div className="run-button">
                    {editingSolution ? saveButton : null}
                    {editingSolution ? cancelButton : null}
                    <Button variant="primary" size="lg" style={{display: "block", width: "20%", fontWeight: "bold"}} disabled={editingSolution} onClick={() => {handleEdit()}}>&#9998; Edit</Button>
                    <Button variant="dark" size="lg" style={{display: "block", width: "20%", fontWeight: "bold"}} disabled={editingSolution} onClick={() => {handleRun()}}>&#10145; Run</Button>
                </div>
                {terminal}
            </Accordion.Body>
        </Accordion.Item>
    );
}