import React, { useState } from "react";
import { useSelector } from "react-redux";
import useLogin from "../Hooks/useLogin";

const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const loginErr = useSelector((state) => state.error.loginErr);
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(name, mail, pass, isSignUp);
  };

  const toggleSignUp = () => setIsSignUp((prev) => !prev);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {isSignUp && (
          <input
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      {loginErr && (
        <div>
          <p>{loginErr}</p>
        </div>
      )}
      <div>
        {isSignUp ? "Already a User? " : "New User? "}
        <button onClick={toggleSignUp}>
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Login;
