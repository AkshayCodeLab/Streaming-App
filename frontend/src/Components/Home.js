import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHomeContent } from "../Utils/contentSlice";
import useFetcHomePage from "../Hooks/useFetchHomePage";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const content = useSelector((store) => store.content.homeContent);
  const token = localStorage.getItem("token");

  useFetcHomePage(token);

  const handleSignout = () => {
    localStorage.removeItem("token");
    dispatch(setHomeContent(""));
    navigate("/home");
  };

  return token ? (
    <div>
      <h1>This is the home page.</h1>
      <button onClick={handleSignout}>Sign-Out</button>
      {content && <div>{content}</div>}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Home;
