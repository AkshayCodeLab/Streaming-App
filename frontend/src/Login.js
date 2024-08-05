import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("This is the name : " + name);
    console.log("This is the password : " + pass);
    console.log("This is the mail : " + mail);

    login(name, mail, pass);
  };

  const login = async (name, mail, pass) => {
    let url = process.env.REACT_APP_BACKEND_URL;

    let bodyParams = {
      username: name,
      password: pass,
    };
    if (isSignUp) {
      url += "/register";
      bodyParams.email = mail;
    } else {
      url += "/login";
    }

    console.log("Sending POST req to : " + url);
    console.log("The requ body is :" + JSON.stringify(bodyParams));

    try {
      const response = await axios.post(url, bodyParams);

      console.log(
        "This is the login response : " + JSON.stringify(response?.data?.token)
      );
      localStorage.setItem("token", response?.data?.token);
      navigate("/Home");
    } catch (e) {
      const errorString = e.response?.data;

      console.log(errorString);
      setName("");
      setPass("");
      errorString ? setErr(e.response?.data) : setErr("Bad Request");
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {isSignUp && (
          <input
            placeholder="E-Mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        )}
        <input
          placeholder="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      <div>{err && <p>{err}</p>}</div>
      <div>
        {isSignUp ? "Already a User? " : "New User?"}
        <button onClick={toggleSignUp}>
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Login;
