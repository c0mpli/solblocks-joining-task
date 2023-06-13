import React, { useState } from "react";
import "./styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import useLogin from "../hooks/useLogin";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };
  return (
    <div className="login-wrapper">
      <nav className="navbar">
        <img src={logo} onClick={() => navigate("../")} alt="Logo" />
        <div className="navbar-buttons"></div>
      </nav>
      <div className="content-wrapper">
        <div className="login-form-container">
          <form className="login-form">
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={(e) => handleSubmit(e)}>Login</button>
            <div className="login-subtitle">
              <p>New Here?</p>
              <Link to="/signup">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
