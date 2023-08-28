import React from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate= useNavigate();
  return (
    <div className="loginbox">
      <div className="logtitle">Login</div>
      <div className="loginuser">
        <div className="subtitle">UserEmail</div>
        <input type="email" className="inputlogin" placeholder="Enter the email" />
      </div>
      <div className="login">
        <div className="subtitle">Password</div>
        <input type="password" className="inputlogin" placeholder="Enter the password" />       
      </div>
      <span className="subtitle pd">Forget Password?</span>
      <div className="loginbtn">
        <button className="btn">Login</button>
      </div>
      <div className="signup">
      Don't have an account? <span id="done" onClick={()=>navigate("/signup")}>Signup</span>
      </div>
    </div>
  );
};

export default Login;
