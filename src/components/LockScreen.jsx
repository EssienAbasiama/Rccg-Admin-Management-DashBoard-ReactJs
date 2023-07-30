import React from "react";
import { useState, useEffect } from "react";
import "./LockScreen.css";
import Header from "./Header";
import NewComer from "./NewComer";
import Footer from "./Footer";
import { useAuth } from "./api/AuthContext";

function LockScreen() {
  const [valid, setValid] = useState(false);
  const [showErrorMessge, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, isAuthenticated, handleLogout } = useAuth();
  

  //
  // const handleSubmit = (event) => {
  //   setLoading(true);
  //   if (username === usernameInput && password === passwordInput) {
  //     setValid(true);
  //     setShowErrorMessage(false);
  //   } else {
  //     setValid(false);
  //     setShowErrorMessage(true);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    if (isAuthenticated) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = await handleLogin(username, password);
    validateToken(token);
  };

  const validateToken = (token) => {
    if (token && typeof token === 'string' && token.trim().length > 0) {
      // setValid(true);
      console.log("Successful Login");
      setLoading(false);
    } else {
      setShowErrorMessage(true);
      setLoading(false);
    }
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
          <form onSubmit={handleSubmit} className="lockBody">
            <div className="lockScreen_Title">
              Welcome to RCCG Admin DashBoard,
            </div>
            <div className="login">Input Your Credentials to LogIn</div>
            {showErrorMessge ? (
              <div className="login_error">Invalid UserName or Password</div>
            ) : (
              ""
            )}
            <div className="input_container">
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                placeholder="Input Your UserName"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input_container">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Input Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handleSubmit} className="button-30">
                Login{" "}
                <span>
                  {loading && (
                    <div class="lds-ellipsis">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default LockScreen;
