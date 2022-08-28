import React, { useContext } from "react";
import "../assets/Banner.css";
import { AuthContext } from "./Auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Banner() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  let bannerData = {
    title: "Don't turn your face!!",
    desc: "This is a website for detecting and preventing cheat. To take the online exam through face detection by using the exam web site on our website.",
  };

  function checkCurrentUser() {
    // console.log("asdasdasdas");
    if (currentUser) {
      // console.log("currentUser: " + currentUser.name);
      navigate("/teacher", { replace: true });
    } else {
      navigate("/signup", { replace: true });
    }
  }

  return (
    <div className="banner-bg">
      <div className="overlay">
        <div className="container">
          <div className="banner-con">
            <div className="banner-text">
              <h1>{bannerData.title}</h1>
              <h3>{bannerData.desc}</h3>
              <Button className="banner-btn" onClick={checkCurrentUser}>
                Get start with DTUF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
