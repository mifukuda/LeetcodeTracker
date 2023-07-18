import React from "react";
import { ProblemCard } from ".";
import Accordion from 'react-bootstrap/Accordion';

export default function SolutionList(props) {
    const list = props.problems.map((problem, index) => 
        <ProblemCard key={index} problem={problem}/>
    )
    return(
        <Accordion defaultActiveKey={['0']} alwaysOpen>
        </Accordion>
    )
}