import React from "react";
import { Navigate } from "react-router-dom";
import useFetcHomePage from "../Hooks/useFetchHomePage";
import Header from "./Header";
import Container from "./Container";
const Home = () => {
  const token = localStorage.getItem("token");

  useFetcHomePage(token);

  return token ? (
    <div>
      <Header />
      <Container />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Home;
