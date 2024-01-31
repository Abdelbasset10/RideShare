import React, { useState } from "react";
import AdminProfileIcon from "../assets/img/icons/icon-admin-profile.png";
import AdminTrajetsIcon from "../assets/img/icons/icon-admin-trajets.png";
import AdminLogoutIcon from "../assets/img/icons/icon-admin-logout.png";
import AdminResearchIcon from "../assets/img/icons/icon-research.png";
import { useAuth } from "../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { successToast } from "../utils/helpers.ts";


const AdminProfile = () => {

    const [currentPanel, setCurrentPanel] = useState<string>("trajets");
    const { logout } = useAuth();
    const navigator = useNavigate();

    const displayPanel = () => {
        switch (currentPanel) {
            case "trajets":
                return <div>trajets</div>
            case "users":
                return <div>users</div>
        }
    }

    return (
      <div className="admin-profile-wrapper">
        <div className="admin-body">
          <div className="admin-left-part">
            <div className="admin-left-part-nav">
              <div
                onClick={() => setCurrentPanel("trajets")}
                className={`${
                  currentPanel === "trajets" ? "active" : ""
                } admin-left-item`}
              >
                <img src={AdminTrajetsIcon} alt="#" />
                <p>Liste des Trajets</p>
              </div>

              <div
                className={`${
                  currentPanel === "users" ? "active" : ""
                } admin-left-item`}
                onClick={() => setCurrentPanel("users")}
              >
                <img src={AdminProfileIcon} alt="#" />
                <p>Liste des Utilisateurs</p>
              </div>
            </div>

            <div
              onClick={() => {
                
                  if(window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
                    navigator("/login");
                    successToast("Déconnexion réussie");
                    logout();
                
                  }
                  
              }}
              className="admin-signout"
            >
              <img className="w-7 mr-1" src={AdminLogoutIcon} alt="" />
              <p>Déconnexion</p>
            </div>
          </div>

          <div className="admin-right-part">
            <nav className="admin-research-bar">
              <img className="w-7" src={AdminResearchIcon} alt="#" />
              <input placeholder="Rechercher" />
            </nav>
          </div>
        </div>
      </div>
    );
}
 
export default AdminProfile;