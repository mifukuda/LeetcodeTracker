import React from "react";
import { ProblemCard } from ".";

export default function ProblemList(props) {

    if(props.problems.length === 0) {
        return(
            <div className="no-data-message">
                <p>No problems to display...</p>
            </div>
        )
    }

    const list = props.problems.map((problem, index) => 
        <ProblemCard key={index} problem={problem}/>
    )
    return(
        <div className="problem-list">
            {list}
        </div>
    )
}