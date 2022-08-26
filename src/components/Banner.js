import React from "react";
import "../assets/Banner.css";
import { Link } from "react-router-dom";

function Banner() {
  let bannerData = {
    title: "Don't turn your face!!",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similiqueperspiciatis iste porro sed, repellendus odit earum accusamus ametsequi, tempore consequatur culpa laboriosam quod! Obcaecati abreprehenderit quo ut at",
  };
  return (
    <div className="banner-bg">
      <div className="container">
        <div className="banner-con">
          <div className="banner-text">
            <h1>{bannerData.title}</h1>
            <p>{bannerData.desc}</p>
            <Link className="banner-btn" to="/signup">
              Get start with DTUF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
