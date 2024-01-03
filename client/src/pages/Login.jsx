import { useController, useForm } from "react-hook-form";
import { useAuth } from "../hooks/auth/useAuth";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { redirect, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../utils/helpers";

import manIllustration from "../assets/img/illustrations/illustration_man_sitting.png";
import avatarIcon from "../assets/img/icons/icon_avatar.png";

const Login = () => {
  const schema = z.object({
    email: string().email().min(1),
    password: string().min(4),
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const { errors: formErrors } = formState;

  const handleLogin = async (data) => {
    try {
      await login(data);
      navigate("/");
      successToast("Connexion effectué avec succès");
    } catch (errMessage) {
      console.error(errMessage);
      errorToast(`${errMessage} : Impossible de vous connecter`);
    }
  };

  return (
    <section className="login-section">
      <div className="login-wrapper">
        <div className="login-form-structure">
          <div className="login-header">
            <img src={avatarIcon} alt="Avatar" />
            <h2>Bienvenue</h2>
            <h4>Veuillez introduire vos informations pour vous connecter</h4>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="login-form">
            <div className="form-row form-group">
              <label htmlFor="email">Email </label>
              <div className="error-msg">{formErrors?.email?.message}</div>

              <input id="email" type="text" {...register("email")} />
            </div>

            <div className="form-row form-group">
              <label htmlFor="password">Mot De Passe </label>
              <div className="error-msg">{formErrors?.password?.message}</div>

              <input id="password" type="password" {...register("password")} />
            </div>

            <button type="submit">Se Connecter</button>
          </form>
        </div>

        <img
          className="form-illustration"
          src={manIllustration}
          alt="Man Sitting"
        />
      </div>
    </section>
  );
};

export default Login;
