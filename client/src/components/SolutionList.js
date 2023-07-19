import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { SolutionCard } from ".";
import { useSelector } from "react-redux";

export default function SolutionList(props) {
    const solutions = useSelector(state => state.currentSolutions);

    const list = solutions.map((solution, index) => 
        <SolutionCard key={index} solution={solution}/>
    );

    return(
        <div className="solution-list">
            <Accordion defaultActiveKey="0">
                {list}
            </Accordion>
        </div>
    )
}