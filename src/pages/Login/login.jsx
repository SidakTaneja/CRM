import React, { useState } from "react";
import "./login.css";
import Home from "../Home/home.jsx"
import SignUp from "../SignUp/signup.jsx"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [screen, setScreen] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("username:", username);
        console.log("password:", password);
        if (username === "Sidal") {
            setErrorMessage("Username or Password is incorrect")
        }
        else setScreen("Home")
    }

    function signup() {
        setScreen("SignUp")
    }

    if (screen === "Home") {
        return <Home />
    }

    if (screen === "SignUp") {
        return <SignUp />
    }

    return (
        <div className="main">
            <h1 className="login-heading">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                    className="login-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="login-input"
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="login-button">
                    Sign In
                </button>

                <div style={{ alignSelf: "center" }}>
                    <text class="signup-text">New to CRM?</text>
                    <button type="submit" className="signup-button" onClick={signup}>
                        Create an account
                    </button>
                </div>

            </form>
        </div>
    );
}

export default Login;
