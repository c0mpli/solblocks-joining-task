import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import "./styles/Login.css";
import useSignup from "../hooks/useSignup";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { signup } = useSignup();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await signup(email, password);
  }
  return (
    <>
      <div className="login-wrapper">
        <nav className="navbar">
          <img src={logo} onClick={() => navigate("../")} alt="Logo" />
          <div className="navbar-buttons"></div>
        </nav>
        <div className="content-wrapper">
          <div className="login-form-container">
            <form className="login-form">
              <h1>Sign Up</h1>

              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p
                style={{
                  color: errorMessage === "ok" ? "lightgreen" : "lightred",
                  display: !errorMessage ? "ok" : "",
                }}
              >
                {errorMessage === "ok"
                  ? "Signup Successfull, Please login"
                  : errorMessage}
              </p>

              <button value="submit" onClick={(e) => handleSubmit(e)}>
                Sign Up
              </button>
              <div className="login-subtitle">
                <p>Already have an account?</p>
                <Link to={"../login"}>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
