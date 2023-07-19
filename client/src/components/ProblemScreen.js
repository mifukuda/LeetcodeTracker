import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useSelector, useDispatch } from 'react-redux';
import { EnterSolutionModal, SolutionList } from ".";
import { getProblemById } from "../api";
import { setCurrentProblem, setCurrentSolutions } from "../actions";

export default function ProblemScreen() {
    const problem = useSelector(state => state.currentProblem);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const difficulties = ["None", "Easy", "Medium", "Hard"];
    const colors = ["gray", "green", "orange", "red"];

    useEffect(() => {
        getProblemById(problem._id)
        .then((response) => {
            if(response.status === 200) {
                dispatch(setCurrentProblem(response.data.problem));
                dispatch(setCurrentSolutions(response.data.solutions));
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function handleClose() {
        setShow(false);
    }

    function handleShow() {
         setShow(true);
    }
    
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
            {/* <ReactQuill theme="snow" style={formStyle} onChange={(content, delta, source, editor) => handleChangeDescription(content, delta, source, editor)}/> */}
            <h3 className="tertiary-header">Description: </h3>
            <ReactQuill theme="bubble" readOnly={true} style={{height: '700px', border: '1px solid black', marginBottom: '2.5%'}} defaultValue={problem.html}/>
            <div className="edit-button">
                <Button variant="success" size="lg" style={{display: "block", marginLeft: "auto", marginRight: "0", width: "20%", fontWeight: "bold"}}>&#9998; Edit</Button>
            </div>
            <h3 className="tertiary-header">Solutions: </h3>
            <div className="solution-list-header">
                <h3>{problem.solutions.length} solutions</h3>
                <Button variant="dark" size="lg" style={{width:"20%", marginLeft: "auto", fontWeight:"bold"}} onClick={() => handleShow()}>New (+)</Button>
            </div>
            <SolutionList/>
        </div>
    )
}