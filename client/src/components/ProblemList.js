import React from "react";
import { ProblemCard } from ".";

export default function ProblemList(props) {
    const list = props.problems.map((problem, index) => 
        <ProblemCard key={index} problem={problem}/>
    )
    return(
        <div className="problem-list">
            {list}
        </div>
    )
}