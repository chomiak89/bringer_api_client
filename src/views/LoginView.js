import React from "react";
import { useState } from "react";
import axios from "axios";

// import styles
import "../styles/login.css";

export default function LoginView() {
  //set state to keep track of username and password
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  //set state to hold JWT token once received
  const [jwtState, setJwtState] = useState("");

  //set event to update state on input field change
  const updateState = (event) =>
    setLoginState({
      ...loginState,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      //   .post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, state)
      .post(
        `https://drab-cyan-camel-vest.cyclic.app/generate_token`,
        loginState
      )
      .then((res) => {
        console.log(res.data);
        setJwtState(res.data);
        // navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="login_form_container">
          <div className="main_input_container">
            <div className="input_container">
              <label>Username:</label>
              <input
                name="username"
                value={loginState.username}
                type="text"
                onChange={updateState}
                required
              ></input>
            </div>
            <div className="input_container">
              <label>Password:</label>
              <input
                name="password"
                value={loginState.password}
                type="password"
                onChange={updateState}
              ></input>
            </div>
          </div>
          <button className="login_submit_button">Login</button>
        </div>
        <div className="jwt_container">
          {jwtState ? <h3>JWT Token</h3> : null}
          {jwtState ? <p>{jwtState.message}</p> : null}
        </div>
      </form>
    </div>
  );
}
