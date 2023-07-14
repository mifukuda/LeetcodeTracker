import React from "react";
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card';

export default function ProblemCard() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/problem/2347918347");
    }

    return(
        <div>
            <Card onClick={() => handleClick()} style={{width: '100%', cursor: "pointer", marginBottom:"2.5%"}}>
                <Card.Body>
                    <Card.Title>1. Two Sum</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}