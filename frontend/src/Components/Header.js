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
    <div className="flex justify-between h-15 w-full bg-black absolute z-50">
      <img
        className="h-14"
        src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-symbol.jpg"
        alt="logo"
      />
      <button
        onClick={handleSignout}
        className="bg-red-700 text-white px-2 py-1 rounded-sm h-10 mt-2 mr-2"
      >
        Sign-Out
      </button>
    </div>
  );
};

export default Header;
