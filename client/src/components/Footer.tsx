import { Link } from "react-router-dom";
import rideshareLogo from "../assets/img/logo.png";
import React from "react";

const Footer = () => {
  return (
    <footer className="px-14 py-6  footer flex justify-between text-white w-full bg-bg-green-dark">
      <Link to="/" className="navbar-logo-wrapper m-auto">
        <img src={rideshareLogo} alt="Logo Rideshare" />
        <p>RideShare</p>
      </Link>
    </footer>
  );
};

export default Footer;
