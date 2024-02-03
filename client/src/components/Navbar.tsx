import { Link } from "react-router-dom";
import rideshareLogo from "../assets/img/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";
import React from "react";
import { UserTypes } from "../utils/type-interfaces.ts";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // isOpen est true le menu est ouvert-false quand il est fermé.

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <Link to="/" className="navbar-logo-wrapper">
          <img src={rideshareLogo} alt="Logo Rideshare" />
          <p>RideShare</p>
        </Link>

        <div className="block md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} md:block navbar-right`}>
          <Link to="/">Acceuil</Link>
          <Link to="/routes/search">Rechercher Trajet</Link>
          <Link to="/profile/trajets_created/1">Ajouter Trajet</Link>
          {!user && (
            <>
              <Link className="btn-register" to="/register">
                S'inscrire
              </Link>
              <Link className="btn-login" to="/login">
                Se Connecter
              </Link>
            </>
          )}

          {user && user.type !== UserTypes.ADMIN && (
            <Link to="/profile/account/0" className="profile-btn">
              Profile
            </Link>
          )}

          {user && /*user.type === UserTypes.ADMIN &&*/ (
            <Link to="/admin" className="profile-btn">
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
