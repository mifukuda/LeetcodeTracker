import React from "react";
import Button from 'react-bootstrap/Button';

export default function WelcomeScreen() {

    const buttonStyle = {
        width: "18%",
        fontSize: "1.8em",
        fontWeight: "bold"
    }

    return(
        <div className="welcome-screen">
            <div className="welcome-screen-banner">
                <img className="welcome-screen-image" src={require('../images/haru_wallpaper.jpg')} alt="banner"/>
                <img className="welcome-screen-title" src={require('../images/logo2.png')} alt="logo"/>
                <div className="welcome-screen-buttons">
                    <Button variant="dark" size="lg" style={buttonStyle}>Log In</Button>
                    <p style={{marginBottom: 0, color: "white"}}>- or -</p>
                    <Button variant="dark" className="orange-button" size="lg" style={buttonStyle}>Create Account</Button>
                </div>
            </div>
            <div className="welcome-screen-options">
                <p className="welcome-screen-text"> 
                    HaruCode will help you stay on top of your LeetCode goals by generating progress graphs 
                    and making it easy to organize the problems you've solved.
                    This website is named after my pet cat, Haru.</p>
                <p style={{fontSize: "1.2em"}}>Made by Minato Fukuda &#128512; (GitHub: mifukuda)</p>
            </div>
        </div>
    )
}