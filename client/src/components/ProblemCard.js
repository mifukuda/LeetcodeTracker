/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { setCurrentProblem } from "../actions";

export default function ProblemCard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const difficulties = ["None", "Easy", "Medium", "Hard"];
    const colors = ["gray", "green", "orange", "red"];
    const problem = props.problem;

    const difficultyColor = {
        color: colors[problem.difficulty]
    }

    // Navigate to ProblemScreen; set currentProblem state
    function handleClick() {
        dispatch(setCurrentProblem(problem));
        navigate("/problem/" + problem._id);
    }

    let tagContainer = null;
    if(problem.tags.length) {
        tagContainer = problem.tags.map((tag, index) => 
            <div className="card-tag-container" key={index}>
                {tag}
            </div>
        );
    }

    let date = new Date(problem.createdAt).toLocaleString().split(",")[0];

    return(
        <div>
            <Card style={{width: '100%', marginBottom:"1%"}}>
                <Card.Header>
                    <Card.Title>
                        <a className="card-title-link" onClick={() => handleClick()}>
                            {problem.number}. {problem.name}
                        </a>
                        <Button variant="secondary" style={{marginLeft: "auto", marginRight: 0, paddingRight: 5, paddingLeft: 5, paddingBottom: 0, paddingTop: 0}}>&#10005;</Button>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted"> <span style={difficultyColor}>{difficulties[problem.difficulty]}</span> ({problem.solutions.length} solutions)</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Date created: {date}</Card.Subtitle>
                    <Card.Text>
                        {problem.description.substring(0, 380)}...
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {tagContainer}
                </Card.Footer>
            </Card>
        </div>
    )
}