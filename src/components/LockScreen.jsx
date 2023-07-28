import React from "react";
import { useState } from "react";
import "./LockScreen.css";
import Header from "./Header";
import NewComer from "./NewComer";
import Footer from "./Footer";

function LockScreen() {
  const username = "test";
  const password = "test";
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [valid, setValid] = useState(false);
  const [showErrorMessge, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleUserName = (event) => {
    setUsernameInput(event.target.value);
  };
  const handlePassword = (event) => {
    setPasswordInput(event.target.value);
  };
  const handleSubmit = (event) => {
    setLoading(true);
    if (username === usernameInput && password === passwordInput) {
      setValid(true);
      setShowErrorMessage(false);
    } else {
      setValid(false);
      setShowErrorMessage(true);
    }
    setLoading(false);
  };

  return (
    <div className="LockScreen-container">
      {valid ? (
        <div className="managementPage">
          <Header></Header>
          <NewComer></NewComer>
          <Footer></Footer>
        </div>
      ) : (
        <div className="lockScreenBody">
          <div className="lockBody">
            <div className="lockScreen_Title">
              Welcome to RCCG Admin DashBoard,
            </div>
            <div className="login">Input Your Credentials to LogIn</div>
            {showErrorMessge ? (
              <div className="login_error">Invalid UserName or Password</div>
            ): ""}

            <div className="input_container">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Input Your UserName"
                onChange={handleUserName}
              />
            </div>
            <div className="input_container">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Input Password"
                onChange={handlePassword}
              />
            </div>
            <div>
              <button onClick={handleSubmit} className="button-30">
                Login {loading && <div class="lds-dual-ring"></div>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LockScreen;
