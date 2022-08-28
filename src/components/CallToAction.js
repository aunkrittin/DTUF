import React from "react";
import "../assets/CallToAction.css";
import { FiVideo } from "react-icons/fi";

function CallToAction() {
  return (
    <div className="cta-bg">
      <div className="overlay">
        <div className="container">
          <div className="cta-text">
            <FiVideo />
            <h2>We're DTUF team</h2>
            <h5>
              We're students from Walailak university. This project is the final
              project for us to graduate.
            </h5>
            <p>Copyright &copy; 2022. All Rights Reserve</p>
            {/* <a href="#" className="cta-btn">
              get to know us
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
