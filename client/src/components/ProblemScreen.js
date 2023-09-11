import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { useSelector, useDispatch } from 'react-redux';
import { EnterSolutionModal, SolutionList } from ".";
import { getProblemById, createTest } from "../api";
import { setCurrentProblem, setCurrentSolutions } from "../actions";
import { useLocation } from "react-router-dom";

export default function ProblemScreen() {
    const dispatch = useDispatch();
    const location = useLocation();
    const {pathname} = location;

    // Current problem being displayed
    const problem = useSelector(state => state.currentProblem);
    // For displaying EnterSolutionModal
    const [show, setShow] = useState(false);
    const [editingTests, setEditingTests] = useState(false);
    // Text that is being displayed in CodeMirror component
    const [test, setTest] = useState("");
    // The actual test code (stored in case user presses 'Cancel' instead of 'Save)
    const [actualTest, setActualTest] = useState("");

    const difficulties = ["None", "Easy", "Medium", "Hard"];
    const colors = ["gray", "green", "orange", "red"];
    const extensions = [python()];

    // Load problem info from backend
    useEffect(() => {
        let id = pathname.split("/")[2];
        getProblemById(id)
        .then((response) => {
            if(response.status === 200) {
                // Update redux state
                dispatch(setCurrentProblem(response.data.problem));
                dispatch(setCurrentSolutions(response.data.solutions));
                // Update test text 
                setTest(response.data.problem.test);
                setActualTest(response.data.problem.test);
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    // Close EnterSolutionModal
    function handleClose() {
        setShow(false);
    }

    // Show EnterSolutionModal
    function handleShow() {
         setShow(true);
    }

    // For Tests tab: Make test-text editable
    function handleEditingTests(value) {
        setEditingTests(value);
    }

    // For Tests tab: Update value of 'test' state
    function handleChangeTest(value, viewUpdate) {
        setTest(value);
    }

    // For Tests tab: Add solution to problem in backend
    function handleClickSave() {
        createTest({
            problemId: problem._id,
            test: test
        }).then((response) => {
            if(response.status === 201) {
                dispatch(setCurrentProblem(response.data.problem));
                setActualTest(test);
                handleEditingTests(false);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleClickCancel() {
        setTest(actualTest);
        handleEditingTests(false);
    }
    
    // Display if test-text is being edited
    let editToolbar = 
        <div className="save-cancel-buttons">
            <Button variant="primary" size="lg" style={{width: "20%", fontWeight: "bold", marginRight: "2.5%"}} onClick={() => handleClickSave()}>Save</Button>
            <Button variant="secondary" size="lg" style={{width: "20%", fontWeight: "bold"}} onClick={() => handleClickCancel()}>Cancel</Button>
        </div>

    return(
        <div className="home-screen">
            <EnterSolutionModal show={show} handleClose={handleClose}/>
            <div className="home-screen-header">
                <h1 className="primary-header">LeetCode Tracker</h1>
                <img className="checkmark-logo" src={require('../images/checkmark.png')} alt="checkmark"/>
            </div>
            <div className="home-screen-subheader">
                <h2 className="secondary-header">{problem.number}. {problem.name} <span style={{color: colors[problem.difficulty]}}>({difficulties[problem.difficulty]})</span></h2>
            </div>
            <Tabs
                defaultActiveKey="0"
                justify
            >
                {/* Description tab: display problem text */}
                <Tab eventKey="0" title="Description">
                    <div className="problem-description">
                        <h3 className="tertiary-header">Description</h3>
                        <p className="explanation-text">View the details of your problem here. Go to the "Solutions" tab to add/run your coded solutions. Go to the "Tests" tab to add tests.</p>
                        <ReactQuill theme="bubble" readOnly={true} style={{height: '700px', border: '1px solid black'}} value={problem.html}/>
                    </div>
                </Tab>
                {/* Solution tab: display list of solutions */}
                <Tab eventKey="1" title="Solutions">
                    <div className="problem-solutions">
                        <h3 className="tertiary-header">Solutions</h3>
                        <p className="explanation-text">You can view the solutions you've coded here. Click on the run button to test your code. You can add tests (pytest) in the "Tests" section!</p>
                        <div className="solution-list-header">
                            <h3>{problem.solutions ? problem.solutions.length: 0} solutions</h3>
                            <Button variant="dark" size="lg" style={{width:"20%", marginLeft: "auto", fontWeight:"bold"}} onClick={() => handleShow()}>New (+)</Button>
                        </div>
                        <SolutionList/>
                    </div>
                </Tab>
                {/* Tests tab: editable CodeMirror component for updating tests */}
                <Tab eventKey="2" title="Tests">
                    <div className="problem-tests">
                        <h3 className="tertiary-header">Tests</h3>
                        <p className="explanation-text">Write your pytest code below. Then, go to the "Solutions" tab to test your solutions!</p>
                        <CodeMirror
                            height="600px"
                            extensions={extensions}
                            editable={editingTests}
                            value={test}
                            onChange={(value, viewUpdate) => {handleChangeTest(value, viewUpdate)}}
                        />
                        <div className="edit-button">
                            {editingTests ? editToolbar : <div className="save-cancel-buttons"></div>}
                            <Button variant="primary" size="lg" disabled={editingTests} style={{width: "20%", fontWeight: "bold"}} onClick={() => handleEditingTests(true)}>&#9998; Edit</Button>
                        </div>
                    </div>
                </Tab>
            </Tabs>
            {/* <ReactQuill theme="snow" style={formStyle} onChange={(content, delta, source, editor) => handleChangeDescription(content, delta, source, editor)}/> */}
        </div>
    )
}