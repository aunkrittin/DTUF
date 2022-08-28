import React from "react";
import "../assets/Content.css";
import { Wave } from "react-animated-text";

function Content() {
  return (
    <div className="container">
      <section className="content-con">
        <div className="content-l">
          <img
            src="https://scontent.xx.fbcdn.net/v/t1.15752-9/296472945_412408587655324_8288286767833722980_n.png?_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeFthDK3sd7eqqD8XvuELH8xJ13giCfSm_UnXeCIJ9Kb9WS432WmS7Cady0Yio2AVm7UHoew5CRXDZj7_LV9UtEq&_nc_ohc=ZYG3o65f3T0AX8ZdQiL&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJLaMWf99GfVKl7P_1GLQKlRFiVvVKxYHvudMk7fQOjDQ&oe=6331ADCB"
            alt=""
          />
        </div>
        <div className="content-r">
          <h2>Forward</h2>
          <p>
            Forward, or straight, is normal for the test taker to be in this
            position (NumPy must be between -10 and 10 on the horizontal or
            y-axis). If not in this position, the website will be considered
            cheat. or considered to be turning left and turning right In any
            case, the website will record and deduct points.
          </p>
        </div>
      </section>
      <section className="content-con">
        <div className="content-r">
          <h2>Turn Right</h2>
          <p>
            Turning to the right occurs only when the test taker is facing the
            right side. Or when the website detects that our page is actually
            facing (the website will set the NumPy value with the y-axis as a
            determinant. In this case, if the y-axis NumPy is greater than or
            equal to 10 assumed to be facing right)
          </p>
        </div>
        <div className="content-l">
          <img
            src="https://scontent.xx.fbcdn.net/v/t1.15752-9/293118684_6164406746908655_5382650077510319963_n.png?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeHGKkfwRQ9CXkNrBzklvq_nbsg4ViwqtOVuyDhWLCq05XSX5PtpVBbe22dk4ljoF2xBUa1mNcrLMzaTiEry9pL8&_nc_ohc=PovghUNeucgAX-Dn9Lc&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJeJgj1uX5wYMF_EbkXK3NFlZQz6t6A8q0GE7cLg5GgMA&oe=6332A411"
            alt=""
          />
        </div>
      </section>
      <section className="content-con">
        <div className="content-l">
          <img
            src="https://scontent.xx.fbcdn.net/v/t1.15752-9/298111585_834088820909768_1901015362743327104_n.png?_nc_cat=108&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeFdbf6Ff7OzGd3BkIJSwBkOnSxNXFtCQg6dLE1cW0JCDmcf8BdGMn96SgKedV7szbCo5ijOP_1HzHI2dXPZBtQS&_nc_ohc=SMW292YbhH8AX8sm8ak&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJtEDtyXVKb1w7jgftEOYn8Jnj1dirRm31GaPQkcylisw&oe=63326566"
            alt=""
          />
        </div>
        <div className="content-r">
          <h2>Turn Left</h2>
          <p>
            Turning to the left occurs only when the test taker is facing to the
            left. Or when the website detects that our page is actually facing
            (the website will set the NumPy value with the y-axis as a
            determinant. In this case, if the y-axis NumPy is less than or equal
            to -10 assumed to turn left)
          </p>
        </div>
      </section>
    </div>
  );
}

export default Content;
