import React, { useState, useEffect } from "react";
import { ProblemList, NewProblemModal } from ".";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAllProblems } from "../api";

export default function HomeScreen() {
    const [show, setShow] = useState(false);
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        try {
            getAllProblems ()
            .then((response) => {
                if(response.status === 200) {
                    console.log(response.data.data);
                    setProblems(response.data.data);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    function handleClose() {
        setShow(false);
    }

    function handleShow() {
         setShow(true);
    }

    return(
        <div className="home-screen">
            <NewProblemModal show={show} handleClose={handleClose}/>
            <div className="home-screen-header">
                <h1 className="primary-header">LeetCode Tracker</h1>
                <img className="checkmark-logo" src={require('../images/checkmark.png')} alt="checkmark"/>
            </div>
            <div className="home-screen-subheader">
                <h2 className="secondary-header">Problem List</h2>
                <Button variant="dark" style={{width:"25%", marginLeft: "auto", fontWeight:"bold"}} onClick={() => handleShow()}>NEW PROBLEM (+)</Button>
            </div>
            <div>
                <Form.Label>Search</Form.Label>
                <Form.Control size="lg" type="text" placeholder="Search by name, tag, or difficulty..."/>
            </div>
            <ProblemList problems={problems}/>
        </div>
    )
}