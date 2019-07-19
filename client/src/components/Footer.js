import React from "react";
import darksky from "../images/darksky.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer__content">
        <div />
        <div>
          <p>
            &copy; 2019{" "}
            <a
              href="https://tjlabaugh.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              TJ LaBaugh
            </a>
          </p>
        </div>
        <div>
          <a
            className="darksky"
            href="https://darksky.net/poweredby/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={darksky} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
