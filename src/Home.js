import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  console.log(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
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

  return (
    <div>
      <h1>This is the home page.</h1>
      {content && <div>{content}</div>}
    </div>
  );
};

export default Home;
