import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from "../api";

export default function CreateAccountScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleClick() {
        try {
            registerUser({
                email: email,
                password: password
            });
        } catch (err) {
            console.log(err);
        }
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    return(
        <div className="create-account-screen">
            <div className="create-account-image-holder">
                <img className="create-account-image" src={require('../images/logo.png')} alt="logo"/>
                <p className="description">A website for all your LeetCode-tracking needs. View the problems you've solved and the solutions you've coded. Stay on schedule with problem-progress graphs.</p>
            </div>
            <div className="create-account-form">
                <img className="create-account-small-logo" src={require('../images/small_logo.png')} alt="small logo"/>
                <Form style={{width: "60%"}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" size="lg" onChange={(event) => handleEmailChange(event)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" size="lg" onChange={(event) => handlePasswordChange(event)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button variant="dark" size="lg" style={{width: "100%"}} onClick={() => handleClick()}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}