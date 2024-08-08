import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHomeContent } from "../Utils/contentSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");
    dispatch(setHomeContent(""));
    navigate("/home");
  };
  return (
    <div className="flex justify-between items-center h-15 w-full bg-gradient-to-b from-black via-black/75 to-transparent fixed top-0 z-50 px-4 py-2">
      <img
        className="h-10"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="logo"
      />
      <button
        onClick={handleSignout}
        className="bg-red-700 text-white px-3 py-1 rounded h-10"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Header;
