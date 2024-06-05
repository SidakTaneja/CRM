import React, { useState } from "react";
import "../Login/login.css";
import Home from "../Home/home.jsx"

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [screen, setScreen] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handlePassword2Change(event) {
        setPassword2(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("username:", username);
        console.log("password:", password);
        console.log("email:", email)
        setScreen("Home")
    }

    if (screen === "Home") {
        return <Home />
    }

    return (
        <div className="main">
            <h1 className="login-heading">Sign Up</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                    className="login-input"
                />
                <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    className="login-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="login-input"
                />
                <input
                    type="password"
                    value={password2}
                    onChange={handlePassword2Change}
                    placeholder="Confirm password"
                    className="login-input"
                />
                <button type="submit" className="login-button">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
