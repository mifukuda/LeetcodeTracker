import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { SolutionCard } from ".";
import { useSelector } from "react-redux";

export default function SolutionList(props) {
    const solutions = useSelector(state => state.currentSolutions);

    if(solutions.length === 0) {
        return(
            <div className="no-data-message">
                <p>No problems to display...</p>
            </div>
        )
    }

    const list = solutions.map((solution, index) => 
        <SolutionCard key={index} index={index} solution={solution}/>
    );

    return(
        <div className="solution-list">
            <Accordion defaultActiveKey={[0]} alwaysOpen>
                {list}
            </Accordion>
        </div>
    )
}