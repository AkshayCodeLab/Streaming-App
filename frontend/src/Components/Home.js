import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    fetchHomePageDetails(token);
  }, []);

  const fetchHomePageDetails = async (token) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/home",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log(JSON.stringify(response.data));
      setContent(response.data?.data);
    } catch (error) {
      console.log("This is the error : " + error);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
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
