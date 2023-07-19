import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

export default function SolutionCard(props) {
    const solution = props.solution;
    const extensions = [python()];

    return (
        <Accordion.Item eventKey="0">
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
                    <Button variant="dark" size="lg" style={{display: "block", marginLeft: "auto", marginRight: "0", width: "20%", fontWeight: "bold"}}>&#10145; Run</Button>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    );
}