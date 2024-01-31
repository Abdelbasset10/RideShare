import { Link, useParams } from "react-router-dom";
import CompteLogo from "../assets/img/icons/profile-account-icon.png";
import TrajetsLogo from "../assets/img/icons/profile-trajets-icon.png";
import LogoutLogo from "../assets/img/icons/icon_logout.png";
import React, { useState } from "react";
import ProfileAccount from "../components/Profile/ProfileAccount.tsx";
import ProfileTrajetsCreated from "../components/Profile/ProfileTrajetsCreated.tsx";
import ProfileTrajetsReserved from "../components/Profile/ProfileTrajetsReserved.tsx";
import { boolean } from "zod";

const Profile = () => {
  
    let { type,create } = useParams();
    let createTrajet = create === "1";

  const menuTypes = [ 
    "account",
    "trajets_created",
    "trajets_reserved",
  ]

  let val = type ? type : "account";

  const [rightMenuType, setRightMenuType] = useState<string>(val);

  const displayRightPartProfile = () => {
    switch (rightMenuType) {
      case "account":
        return <ProfileAccount />;

      case "trajets_created":
        return <ProfileTrajetsCreated create={createTrajet} />;

      case "trajets_reserved":
        return <ProfileTrajetsReserved />;
    }
  };

  return (
    <section className="profile-section">
      <div className="profile-section-wrapper">
        <div className="profile-left-part">
          <ul className="profile-links-list">
            <li
              className="links-item"
              onClick={() => {
                setRightMenuType("account");
              }}
            >
              <img src={CompteLogo} alt="CompteLogo" />
              <p>Compte</p>
            </li>

            <li
              className="links-item"
              onClick={() => {
                setRightMenuType("trajets_created");
              }}
            >
              <img src={TrajetsLogo} alt="TrajetsLogo" />
              <p>Trajets Crées</p>
            </li>

            <li
              className="links-item"
              onClick={() => {
                setRightMenuType("trajets_reserved");
              }}
            >
              <img src={TrajetsLogo} alt="TrajetsLogo" />
              <p>Reservations</p>
            </li>
          </ul>

          <div className="  text-orange cursor-pointer flex items-center justify-start">
            <img
              className="mr-3 h-4 w-auto"
              src={LogoutLogo}
              alt="LogoutLogo"
            />
            <p className="">Déconnexion</p>
          </div>
        </div>

        <div className="profile-right-part">{displayRightPartProfile()}</div>
      </div>
    </section>
  );
};

export default Profile;
