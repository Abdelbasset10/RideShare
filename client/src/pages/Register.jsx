import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, string, z } from "zod";
import RegisterForm from "../components/RegisterForm.tsx";
import manIllustration from "../assets/img/illustrations/illustration_register_man.png";
import avatarIcon from "../assets/img/icons/icon_avatar.png";
import { fetchFnc } from "../utils/fetch";
import { useAuth } from "../hooks/auth/useAuth";
import { errorToast, successToast } from "../utils/helpers.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onRegister = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (
        data["type"] === "VOYAGEUR" &&
        (key === "vehicleBrand" ||
          key === "vehicleMatricule" ||
          key === "vehicleMaxPlace" ||
          key === "vehicleModel" ||
          key === "vehicleYear")
      ) {
        continue;
      }
      formData.append(key, data[key]);
    }

    console.log(`type de placeMax`, formData);

    try {
      const successMsg = await fetchFnc({
        url: "auth/sign-up",
        method: "post",
        data: data,
      });
      navigate("/login");
      successToast("Utilisateur crée avec succes");
    } catch (errMsg) {
      errorToast(errMsg);
    }
  };

  return (
    <section className="register-section">
      <div className="register-wrapper">
        <div className="form-structure">
          <div className="register-header">
            <img src={avatarIcon} alt="Avatar" />
            <h2>Partagez la route avec nous</h2>
            <h4>Inscrivez-vous maintenant</h4>
          </div>

          <RegisterForm onRegister={onRegister} />
        </div>

        <img
          className="form-illustration"
          src={manIllustration}
          alt="Man Waving"
        />
      </div>
    </section>
  );
};

export default Register;
