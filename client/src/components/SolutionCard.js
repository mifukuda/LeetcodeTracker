import React, {useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { useSelector } from 'react-redux';
import { getOutput } from "../api";

export default function SolutionCard(props) {
    const extensions = [python()];

    const solution = props.solution;
    const problem = useSelector(state => state.currentProblem);
    const [showTerminal, setShowTerminal] = useState(false);
    const [terminalText, setTerminalText] = useState("");

    // Run the solution on backend and display output
    function handleClick() {
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

    let terminal = null;
    if(showTerminal) {
        terminal =
        <div className="terminal">
            {terminalText}
        </div>
    }

    return (
        <Accordion.Item eventKey={props.index}>
            <Accordion.Header><h4 className="solution-card-header">{solution.number}. {solution.name}</h4></Accordion.Header>
            <Accordion.Body>
                <h5 className="solution-card-subheader">Time Complexity: <i>{solution.timeComplexity}</i></h5>
                <h5 className="solution-card-subheader">Space Complexity: <i>{solution.spaceComplexity}</i></h5>
                <h5 className="solution-card-subheader">Code:</h5>
                <CodeMirror
                    height="500px"
                    extensions={extensions}
                    value={solution.code}
                    // onChange={(value, viewUpdate) => {handleChangeCode(value, viewUpdate)}}
                />
                <div className="run-button">
                    <Button variant="dark" size="lg" style={{display: "block", marginLeft: "auto", marginRight: "0", width: "20%", fontWeight: "bold"}} onClick={() => {handleClick()}}>&#10145; Run</Button>
                </div>
                {terminal}
            </Accordion.Body>
        </Accordion.Item>
    );
}