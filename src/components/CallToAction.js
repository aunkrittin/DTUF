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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sint
              architecto voluptatem velit in est. Veniam dolore accusamus
              exercitationem iusto, voluptas eum consectetur ipsa tenetur
              recusandae eligendi quo dolorem maiores!
            </p>
            <a href="#" className="cta-btn">
              get to know us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
