import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Banner from "../components/Banner";
import Content from "../components/Content";
import CTA from "../components/CallToAction";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Banner />
      <Content />
      <CTA />
    </>
  );
};

export default Home;
