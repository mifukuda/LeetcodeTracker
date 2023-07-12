import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

const extensions = [python()];

// Screen for pasting solution into textbox and saving
export default function EnterSolutionModal() {
    return(
        <div className="enter-solution-modal">
            <h1 className="primary-header">Enter your solution: </h1>
            <Form.Control size="lg" type="text" placeholder="Enter solution name..." style={{}}/>
            <CodeMirror
                height="600px"
                extensions={extensions}
            />
            <div className="confirm-cancel-buttons">
                <Stack direction="horizontal" gap={2}>
                    <Button variant="primary">
                        Cancel
                    </Button>
                    <Button variant="success">
                        Submit
                    </Button>
                </Stack>
            </div>
        </div>
    )
}