import { Link } from "react-router-dom";
import rideshareLogo from "../assets/img/logo.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";
import React from "react";
import { UserTypes } from "../utils/type-interfaces.ts";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar ">
      <div className="navbar-wrapper">
        <Link to="/" className="navbar-logo-wrapper">
          <img src={rideshareLogo} alt="Logo Rideshare" />
          <p>RideShare</p>
        </Link>

        <div className="navbar-right">
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
            <Link to="profile/account/0" className="profile-btn">
              Profile
            </Link>
          )}

          {user && /*user.type === UserTypes.ADMIN &&*/ (
            <Link to="admin" className="profile-btn">
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
