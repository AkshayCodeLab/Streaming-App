import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("This is the name : " + name);
    console.log("This is the password : " + pass);
    console.log(
      "This is the backend url : " + process.env.REACT_APP_BACKEND_URL
    );

    login(name, pass);
  };

  const login = async (name, pass) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/login",
        {
          username: name,
          password: pass,
        }
      );

      console.log(
        "This is the login response : " + JSON.stringify(response.data?.token)
      );
      localStorage.setItem("token", response.data?.token);
      navigate("/Home");
    } catch (e) {
      console.log(e.response.data);
      setName("");
      setPass("");
      setErr(e.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{err && <div>{err}</div>}</div>
    </div>
  );
};

export default Login;
