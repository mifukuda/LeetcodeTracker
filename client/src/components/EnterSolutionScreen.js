import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

const extensions = [python()];

// Screen for pasting solution into textbox and saving
export default function EnterSolutionScreen() {
    return(
        <div className="enter-solution-screen">
            <CodeMirror
                value="print('Hello World')"
                height="200px"
                extensions={extensions}
            />
        </div>
    )
}