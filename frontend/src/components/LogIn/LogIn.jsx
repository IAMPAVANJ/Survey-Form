
import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './LogIn.css';

function Login() {
  const styles = {
    backgroundColor : "red",
    width: "150px",
    padding:"5px 10px",
    colo:"white",
    margin:" 20px auto 0px auto"
  }
  const [direct, setDirect] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
    const handleFormSubmit = async(event) => {
      event.preventDefault();
      try {
        const url = "http://localhost:8080/user/login";
        const { data: res } = await axios.post(url, data);
        localStorage.setItem("token", res.data);
        localStorage.setItem(
          'userdetails',
          JSON.stringify(res.message.userdetails)
        );
        setDirect(true)
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
  };

  return (
    <div className="main-container">
      <div className="welcome-container">
        <h1 className="welcome-header">Welcome To MAP Survey</h1>
        <h1 className="welcome-text">Best Surveys Will be here</h1>
        <p className="welcome-info">Sign in to continue access pages</p>
        <p className="welcome-register"> Don’t Have An Account</p>
        <Link className="link-btn" to='/signupPage'> Resgister</Link>
      </div>
      <div className="form-container">
        <div className="form-header">
          <h2>Sign In</h2>
          <p>Sign in to continue access pages</p>
        </div>
        <div className="form-body">
          <form onSubmit={handleFormSubmit}>
            <label>
              <input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
              className="email-input" 
               />
            </label>
            <label>
              <input 
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="password-input" 
              />
            </label>
            {error && <div style={styles} className="error_msg">{error}</div>}
            <button type="submit" id="signin-button">Sign In</button>
          </form>
          {direct && <Navigate to={'/surveys'}/>}
        </div>
      </div>
    </div>
  );
}

export default Login;



