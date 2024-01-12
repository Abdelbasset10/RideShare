import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ProfileAccount = () => {
  const [activePanel, setActivePanel] = useState(1);

const schema = z.object({

}

  const { register, handleSubmit, errors } = useForm({resolver: zodResolver(schema)});
  const handlePanelChange = (panelNumber) => {
    setActivePanel(panelNumber);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a onClick={() => handlePanelChange(1)}>Panel 1</a>
          </li>
          <li>
            <a onClick={() => handlePanelChange(2)}>Panel 2</a>
          </li>
          <li>
            <a onClick={() => handlePanelChange(3)}>Panel 3</a>
          </li>
        </ul>
      </nav>

      {activePanel === 1 && (
        <form onSubmit={handleSubmit()}>
          <div className="profile-img-wrapper">
            {/* Add the profile picture change functionality here */}
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input type="file" id="profilePicture" accept="image/*" />
          </div>

          <hr />

          <label htmlFor="name">Nom</label>
          <input type="text" id="name" />

          <label htmlFor="familyName">Prénom:</label>
          <input type="text" id="familyName" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" />

          <label htmlFor="accountType">Account Type:</label>
          <select id="accountType">
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </form>
      )}

      {activePanel === 2 && <div>Panel 2 content</div>}

      {activePanel === 3 && <div>Panel 3 content</div>}
    </div>
  );
};

export default ProfileAccount;
