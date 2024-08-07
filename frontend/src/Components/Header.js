import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetcHomePage from "../Hooks/useFetchHomePage";
import { useNavigate } from "react-router-dom";
import { setHomeContent } from "../Utils/contentSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const content = useSelector((store) => store.content.homeContent);

  const handleSignout = () => {
    localStorage.removeItem("token");
    dispatch(setHomeContent(""));
    navigate("/home");
  };
  return (
    <div className="flex">
      Header
      <button onClick={handleSignout}>Sign-Out</button>
      {content && <div>{content}</div>}
    </div>
  );
};

export default Header;
