import React from "react";
import appStore from "../../../images/appStore.png";
import playStore from "../../../images/playStore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Product Hunt.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Minhaj Sadik</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Me</h4>
        <a href="http://instagram.com/minhaj_sadik">Instagram</a>
        <a href="http://youtube.com/clever_programmer">Youtube</a>
        <a href="http://facebook.com/MinhajSadik13">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
