import React from "react";
import { ProblemList } from ".";

export default function HomeScreen() {
    return(
        <div className="home-screen">
            <div className="home-screen-header">
                <h1 className="primary-header">LeetCode Tracker</h1>
                <img className="checkmark-logo" src={require('../images/checkmark.png')} alt="checkmark"/>
            </div>
            <h2 className="secondary-header">Problem List</h2>
            <ProblemList/>
        </div>
    )
}