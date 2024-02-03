import React, { useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { z, string, optional } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/auth/useAuth";
import { UserTypes } from "../../utils/type-interfaces.ts";

const ProfileAccount = () => {
  const { user } = useAuth();

  const [activePanel, setActivePanel] = useState(1);

  const { register, handleSubmit, control, formState } = useForm({});

  const { field: userTypeField } = useController({ name: "type", control });

  const onUserTypeChange = (event) => {
    userTypeField.onChange(event.target.value);
  };

  const handlePanelChange = (panelNumber) => {
    setActivePanel(panelNumber);
  };

  const { field: maxPlaceField } = useController({
    name: "vehicleMaxPlace",
    control,
  });
  const { errors } = formState;
  const yearMax = new Date().getFullYear();

  const onUserEdit = (data) => {
  };

  return (
    <div className="profile-account-wrapper">
      <nav className="profile-account-navbar">
        <ul>
          <li className={activePanel === 1 ? "active" : ""}>
            <span onClick={() => handlePanelChange(1)}>Profil</span>
          </li>
          {user?.type === UserTypes.CHAUFFEUR && (
          <li className={activePanel === 2 ? "active" : ""}>
            <span onClick={() => handlePanelChange(2)}>Vehicule</span>
          </li>
          )}

          <li className={activePanel === 3 ? "active" : ""}>
            <span onClick={() => handlePanelChange(3)}>Mot de Passe</span>
          </li>
        </ul>
      </nav>
      {(activePanel === 1 || activePanel === 2) && (
        <form
          className="profile-account-form"
          onSubmit={handleSubmit(onUserEdit)}
        >
          {activePanel === 1 && (
            <div className="account-profile-informations-wrapper ">
              <div className="w-full">
                <div className="account-profile-img-wrapper">
                  <label htmlFor="profilePicture">Profile Picture:</label>
                  <input type="file" id="profilePicture" accept="image/*" />
                </div>

                <hr className="w-full border my-4" />
                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="first_name">Nom</label>
                    <input
                      id="first_name"
                      type="text"
                      {...register("first_name")}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name">Prénom:</label>
                    <input
                      id="last_name"
                      type="text"
                      {...register("last_name")}
                    />
                  </div>
                </div>

                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" {...register("email")} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="n_tlph">Phone Number:</label>
                    <input type="text" id="n_tlph" {...register("n_tlph")} />
                  </div>
                </div>

                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="type">Account Type:</label>
                    <select
                      id="type"
                      value={userTypeField.value}
                      onChange={onUserTypeChange}
                    >
                      <option value="">Chosissez votre type de compte</option>
                      <option value="CHAUFFEUR">Chauffeur</option>
                      <option value="VOYAGEUR">Voyageur</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Sexe</label>
                    <div className="error-msg">
                      {errors?.gender?.message?.toString()}
                    </div>

                    <select id="gender" {...register("gender")}>
                      <option value="">Chosissez votre genre</option>
                      <option value="MALE">Homme</option>
                      <option value="FEMALE">Femme</option>
                    </select>
                  </div>
                </div>

                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="matricule">Matricule:</label>
                    <input
                      type="text"
                      id="matricule"
                      {...register("matricule")}
                    />
                  </div>
                </div>
              </div>

              <button
                className="bg-orange text-white rounded-md px-2.5 py-1"
                type="submit"
              >
                Modifier
              </button>
            </div>
          )}

          {activePanel === 2 && (
            <div className="account-profile-informations-wrapper ">
              <div className="w-full">
                <h1 className="my-3 text-bg-green-dark text-lg">
                  Informations sur le Vehicule:
                </h1>

                <div className="form-row form-group">
                  <label htmlFor="vehicleMatricule">Matricule Véhicule</label>
                  <div className="error-msg">
                    {errors?.vehicleMatricule?.message?.toString()}
                  </div>

                  <input
                    id="vehicleMatricule"
                    type="text"
                    {...register("vehicleMatricule")}
                  />
                </div>

                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="vehicleBrand">Marque du véhicule</label>
                    <div className="error-msg">
                      {errors?.vehicleBrand?.message?.toString()}
                    </div>
                    <input
                      id="vehicleBrand"
                      type="text"
                      {...register("vehicleBrand")}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="vehicleModel">Modèle Véhicule</label>
                    <div className="error-msg">
                      {errors?.vehicleModel?.message?.toString()}
                    </div>

                    <input
                      id="vehicleModel"
                      type="text"
                      {...register("vehicleModel")}
                    />
                  </div>
                </div>

                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="vehicleYear">Année du Véhicule</label>
                    <div className="error-msg">
                      {errors?.vehicleYear?.message?.toString()}
                    </div>

                    <input
                      id="vehicleYear"
                      type="number"
                      min="1950"
                      max={yearMax}
                      {...register("vehicleYear")}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="vehicleMaxPlace">Nombre de Place Max</label>
                    <div className="error-msg">
                      {errors?.vehicleMaxPlace?.message?.toString()}
                    </div>

                    <input
                      id="vehicleMaxPlace"
                      type="number"
                      min="2"
                      value={maxPlaceField.value}
                      onChange={(data) => {
                        const maxPlace = Number(data.target.value);
                        maxPlaceField.onChange(maxPlace);
                      }}
                    />
                  </div>
                </div>
              </div>
              <button
                className="bg-orange text-white rounded-md px-2.5 py-1"
                type="submit"
              >
                Modifier
              </button>
            </div>
          )}
        </form>
      )}

      {activePanel === 3 && (
        <form className="profile-account-form h-full">
          <div className="h-full w-full flex flex-col justify-between pb-6">
            <div className="">
              <h1 className="my-3 text-bg-green-dark text-lg">
                Changement de mot de passe:
              </h1>

              <div className="form-row form-group">
                <label htmlFor="actualPassword">Mot de Passe Actuel</label>
                <div className="error-msg">
                  {errors?.actualPassword?.message?.toString()}
                </div>

                <input
                  id="actualPassword"
                  type="text"
                  {...register("actualPassword")}
                />
              </div>

              <div className="form-row form-group">
                <label htmlFor="newPassword">Nouvrau Mot de Passe </label>
                <div className="error-msg">
                  {errors?.newPassword?.message?.toString()}
                </div>

                <input
                  id="newPassword"
                  type="text"
                  {...register("newPassword")}
                />
              </div>

              <div className="form-row form-group">
                <label htmlFor="newPasswordConfirm">
                  Confirmer nouveau Mot de Passe
                </label>
                <div className="error-msg">
                  {errors?.newPasswordConfirm?.message?.toString()}
                </div>

                <input
                  id="newPasswordConfirm"
                  type="text"
                  {...register("newPasswordConfirm")}
                />
              </div>
            </div>

            <button
              className="bg-orange text-white w-fit rounded-md px-2.5 py-1"
              type="submit"
            >
              Modifier
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileAccount;
