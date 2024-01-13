import { Link } from "react-router-dom";
import CompteLogo from "../assets/img/icons/profile-account-icon.png";
import TrajetsLogo from "../assets/img/icons/profile-trajets-icon.png";
import LogoutLogo from "../assets/img/icons/icon_logout.png";
import React, { useState } from "react";
import ProfileAccount from "../components/Profile/ProfileAccount.tsx";
import ProfileTrajetsCreated from "../components/Profile/ProfileTrajetsCreated.tsx";
import ProfileTrajetsReserved from "../components/Profile/ProfileTrajetsReserved.tsx";

const Profile = () => {
  enum rightMenuTypes {
    account,
    trajets_created,
    trajets_reserved,
  }

  const [rightMenuType, setRightMenuType] = useState<rightMenuTypes>(
    rightMenuTypes.account
  );

  const displayRightPartProfile = () => {
    switch (rightMenuType) {
      case rightMenuTypes.account:
        return <ProfileAccount />;

      case rightMenuTypes.trajets_created:
        return <div className="w-full">TRAJETS CREES</div>;
      //return <ProfileTrajetsCreated />;

      case rightMenuTypes.trajets_reserved:
        return <div className="w-full">TRAJETS reserves</div>;

      //return <ProfileTrajetsReserved />;
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
                setRightMenuType(rightMenuTypes.account);
              }}
            >
              <img src={CompteLogo} alt="CompteLogo" />
              <p>Compte</p>
            </li>

            <li
              className="links-item"
              onClick={() => {
                setRightMenuType(rightMenuTypes.trajets_created);
              }}
            >
              <img src={TrajetsLogo} alt="TrajetsLogo" />
              <p>Trajets Crées</p>
            </li>

            <li
              className="links-item"
              onClick={() => {
                setRightMenuType(rightMenuTypes.trajets_reserved);
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
