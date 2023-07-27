import React from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
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

    return(
        <div>
            <Card onClick={() => handleClick()} style={{width: '100%', cursor: "pointer", marginBottom:"1%"}}>
                <Card.Header>
                    <Card.Title style={{marginBottom: "0"}}>{problem.number}. {problem.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2" style={difficultyColor}>{difficulties[problem.difficulty]}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{problem.solutions.length} solutions</Card.Subtitle>
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