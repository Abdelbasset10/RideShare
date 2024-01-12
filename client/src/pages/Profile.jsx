import { Link } from "react-router-dom";
import CompteLogo from "../assets/img/icons/profile-account-icon.png";
import TrajetsLogo from "../assets/img/icons/profile-trajets-icon.png";
import { useState } from "react";

const Profile = () => {
  const [rightMenuType, setRightMenuType] = useState("account");

  const displayRightPartProfile = (rightMenuType) => {
    switch (rightMenuType) {
      case "account":
        return <ProfileAccount />;
    }
  };

  return (
    <section className="profile-section">
      <div className="profile-left-part">
        <ul className="links-list">
          <li className="links-item">
            <img src="" alt="" />
            <p>Compte</p>
          </li>
        </ul>
      </div>

      <div className="profile-right-part">{displayRightPartProfile}</div>
    </section>
  );
};

export default Profile;
