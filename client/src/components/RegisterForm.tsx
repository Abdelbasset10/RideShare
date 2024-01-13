import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { errorToast } from "../utils/helpers";
import { number, optional, string, z } from "zod";
import { UserTypes } from "../utils/type-interfaces.ts";
import React from "react";

// TODO REGEX

const RegisterForm = ({ onRegister }) => {
  const [currentTab, setCurrentTab] = useState(1);

  const isChauffeur = (data: any) => data.type === UserTypes.CHAUFFEUR;

  // TODO CHECK REGISTER ZOD SCHEMA
  const schema = z
    .object({
      email: string().email(),
      first_name: string().min(2),
      last_name: string().min(2),
      n_tlph: string()
        .min(4)
        .regex(new RegExp("^0[567][0-9]{8}$"), "Numéro de telephone invalide"),
      type: z.enum(Object.values(UserTypes) as [string, ...string[]]), // 'VOYAGEUR' or 'CHAUFFEUR'
      password: string().min(3),
      passwordConfirm: string().min(3),
      gender: z.enum(["MALE", "FEMALE"]), // 'MALE' or 'FEMALE'
      matricule: string().min(4),

      vehicleModel: z
        .string()
        .min(1)
        .refine(isChauffeur, {
          message: "Vehicle model is required for chauffeur",
          path: ["vehicleModel"],
        }),
      vehicleBrand: z
        .string()
        .min(1)
        .refine(isChauffeur, {
          message: "Vehicle brand is required for chauffeur",
          path: ["vehicleBrand"],
        }),
      vehicleYear: z
        .string()
        .min(2)
        .refine(isChauffeur, {
          message: "Vehicle year is required for chauffeur",
          path: ["vehicleYear"],
        }),
      vehicleMatricule: z
        .string()
        .min(1)
        .refine(isChauffeur, {
          message: "Vehicle matricule is required for chauffeur",
          path: ["vehicleMatricule"],
        }),
      vehicleMaxPlace: z
        .number()
        .positive()
        .refine(isChauffeur, {
          message: "Vehicle max place is required for chauffeur",
          path: ["vehicleMaxPlace"],
        }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Mots de Passe ne correspandent pas",
    })
    .refine(
      (data) => {
        if (data.vehicleMatricule) {
          return data.vehicleMatricule.match("^[0-9]{3,}-[0-9]{3}-[0-9]{2}$");
        }
        return true;
      },
      {
        path: ["vehicleMatricule"],
        message: "Matricule du véhicule invalide (Ex: 00155-123-16)",
      }
    );

  const { register, control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });
  const { field: userTypeField } = useController({ name: "type", control });

  const { field: maxPlaceField } = useController({
    name: "vehicleMaxPlace",
    control,
  });
  const { errors } = formState;
  const yearMax = new Date().getFullYear();

  const onUserTypeChange = (event) => {
    userTypeField.onChange(event.target.value);
  };

  const onChangeTab = () => {
    if (currentTab === 1) {
      setCurrentTab(2);
      return;
    }
    setCurrentTab(1);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onRegister)}>
      {currentTab === 1 && (
        <>
          <div className="form-row grid-cols-3">
            <div className="form-group ">
              <label htmlFor="last_name">Nom </label>
              <div className="error-msg">
                {errors?.last_name?.message?.toString()}
              </div>

              <input id="last_name" type="text" {...register("last_name")} />
            </div>

            <div className="form-group mr-5">
              <label htmlFor="first_name">Prénom</label>
              <div className="error-msg">
                {errors?.first_name?.message?.toString()}
              </div>

              <input id="first_name" type="text" {...register("first_name")} />
            </div>

            <div className="form-group">
              <label htmlFor="n_tlph">Numéro Téléphone</label>
              <div className="error-msg">
                {errors?.n_tlph?.message?.toString()}
              </div>

              <input
                id="n_tlph"
                // END: be15d9bcejpp
                type="text"
                {...register("n_tlph")}
              />
            </div>
          </div>

          <div className="form-row grid-cols-2">
            <div className="form-row form-group">
              <label htmlFor="email">Email</label>
              <div className="error-msg">
                {errors?.email?.message?.toString()}
              </div>

              <input id="email" type="email" {...register("email")} />
            </div>

            <div className="form-group">
              <label htmlFor="matricule">Matricule</label>
              <div className="error-msg">
                {errors?.matricule?.message?.toString()}
              </div>
              <input id="matricule" type="text" {...register("matricule")} />
            </div>
          </div>

          <div className="form-row grid-cols-2">
            <div className="form-group">
              <label htmlFor="password">Mot de Passe</label>
              <div className="error-msg">
                {errors?.password?.message?.toString()}
              </div>

              <input id="password" type="password" {...register("password")} />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirmer Mot de Passe</label>
              <div className="error-msg">
                {errors?.passwordConfirm?.message?.toString()}
              </div>

              <input
                id="passwordConfirm"
                {...register("passwordConfirm")}
                type="password"
              />
            </div>
          </div>

          <div className="form-row grid-cols-2">
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

            <div className="form-group">
              <label htmlFor="typeAccount">Type de compte</label>
              <div className="error-msg">
                {errors?.type?.message?.toString()}
              </div>

              <select
                id="typeAccount"
                value={userTypeField.value}
                onChange={onUserTypeChange}
              >
                <option value="">Chosissez votre type de compte</option>
                <option value="CHAUFFEUR">Chauffeur</option>
                <option value="VOYAGEUR">Voyageur</option>
              </select>
            </div>
          </div>
        </>
      )}

      {currentTab === 2 && (
        <>
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
        </>
      )}

      <div className="button-list">
        {userTypeField.value === "CHAUFFEUR" && (
          <div
            className={currentTab === 1 ? "col-span-2" : ""}
            onClick={onChangeTab}
          >
            {currentTab === 1 ? "Suivant" : "Précedent"}
          </div>
        )}
        {(currentTab === 2 || userTypeField.value != "CHAUFFEUR") && (
          <button
            className={currentTab === 1 ? "col-span-2" : ""}
            type="submit"
          >
            S'inscrire
          </button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
